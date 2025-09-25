/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTypeListe,
  getTypeListes,
  updateTypeListe,
  getTypeliste,
  createListe,
  updateListe,
  getListes
} from '../../../../service/parametrage/typeListe';
import toast from 'react-hot-toast';

export function useFormTypeListe({ handleClose }) {
  const { typeListes, createLoading, createError, receiveEditId, valueEdition, receiveId, profil, typeListe, editeListe, liste } =
    useSelector((state) => state.TypeListe);
  const { listePrivileges } = useSelector((state) => state.privilege);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameListe, setNameListe] = useState('');
  const [descriptionListe, setDescriptionListe] = useState('');
  const [selectId, setSelctId] = useState('');
  const [privilege, setPrivilege] = useState(null);
  const [page, setPage] = useState(1);

  const options = [
    { label: 'GENERAL', value: 'genr' },
    { label: 'SPECIFIQUE', value: 'spec' }
  ];

  const itermsPerPage = 5;
  const totalPages = Math.ceil(listePrivileges.length / itermsPerPage);

  const paginatedItems = listePrivileges.slice((page - 1) * itermsPerPage, page * itermsPerPage);

  const saveEnregistrementProfil = async () => {
    if (!name.trim() || !description.trim() || !selectId.trim()) {
      return;
    }
    if (valueEdition === '') {
      const result = await dispatch(createTypeListe({ name, description, selectId }));

      if (createTypeListe.fulfilled.match(result)) {
        await dispatch(getTypeListes());
        handleClose();
        toast.success(`${result?.payload?.message} `);

        setName('');
        setDescription('');
        setSelctId('');
      } else {
        toast.error(`${result?.payload?.message} `);
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateTypeListe({ name, description, selectId, receiveId }));

      if (updateTypeListe.fulfilled.match(result)) {
        await dispatch(getTypeListes());
        handleClose();
        toast.success(`${result?.payload?.message} `);

        setName('');
        setDescription('');
        setSelctId('');
      } else {
        toast.error(`${result?.payload?.message} `);
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getTypeliste(receiveEditId));
    } else {
      setName('');
      setDescription('');
      setSelctId('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && typeListe) {
      setName(typeListe?.strTylname || '');
      setDescription(typeListe.strTyldescription || '');
      setSelctId(typeListe.strTylspecific || '');
    }
    if (editeListe === 'edition') {
      setNameListe(liste?.strLstvalue);
      setDescriptionListe(liste?.strLstdescription);
    }
  }, [typeListe, valueEdition, editeListe, liste]);

  //

  const saveEnregistrementListe = async () => {
    if (!nameListe.trim() || !descriptionListe.trim()) {
      return;
    }
    if (editeListe === '') {
      const result = await dispatch(createListe({ nameListe, descriptionListe, typeListe }));

      console.log({ result });

      if (createListe.fulfilled.match(result)) {
        await dispatch(getListes());
        toast.success(`${result?.payload?.message} `);

        setNameListe('');
        setDescriptionListe('');
      } else {
        // toast.error(`${result?.payload?.message} `);
        toast.error(`Veuillez contacter l'administrateur `);
      }
    } else if (editeListe == 'edition') {
      console.log('editeListe avant save:', editeListe);
      const result = await dispatch(updateListe({ nameListe, descriptionListe, typeListe, liste }));

      if (updateListe.fulfilled.match(result)) {
        await dispatch(getListes());
        toast.success(`${result?.payload?.message} `);

        setNameListe('');
        setDescriptionListe('');
      } else {
        toast.error(`${result?.payload?.message} `);
      }
    }
  };

  return {
    setPage,
    options,
    privilege,
    setPrivilege,
    name,
    setName,
    description,
    setDescription,
    paginatedItems,
    totalPages,
    page,
    itermsPerPage,
    typeListes,
    setSelctId,
    selectId,
    saveEnregistrementProfil,
    getTypeliste,
    profil,
    valueEdition,
    nameListe,
    setNameListe,
    descriptionListe,
    setDescriptionListe,
    saveEnregistrementListe
  };
}
