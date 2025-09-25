/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProfil, getProfils, updateProfil, getProfil } from '../../../../service/parametrage/listeprofil';
import { getPrivileges, createProfilPrivilege } from '../../../../service/parametrage/privilege';
import toast from 'react-hot-toast';

export function useFomProfil({ handleClose }) {
  const { listeProfils, createLoading, createError, receiveEditId, valueEdition, receiveId, profil, listePrivilegeId } = useSelector(
    (state) => state.profil
  );
  const { listePrivileges } = useSelector((state) => state.privilege);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectId, setSelctId] = useState('');
  const [receiveCheckedId, setReceiveCheckedId] = useState([]);
  const [description, setDescription] = useState('');
  const [privilege, setPrivilege] = useState(null);
  const [page, setPage] = useState(1);

  const options = [
    { label: 'METIER', value: 'METIER' },
    { label: 'SYSTEME', value: 'SYSTEME' }
  ];

  console.log({ listePrivilegeId });

  const itermsPerPage = 5;
  const totalPages = Math.ceil(listePrivileges.length / itermsPerPage);

  const paginatedItems = listePrivileges.slice((page - 1) * itermsPerPage, page * itermsPerPage);

  const saveEnregistrementProfil = async () => {
    if (!name.trim() || !description.trim() || !selectId.trim()) {
      return;
    }
    if (valueEdition === '') {
      const result = await dispatch(createProfil({ name, description, selectId }));

      if (createProfil.fulfilled.match(result)) {
        await dispatch(getProfils());
        handleClose();
        toast.success(`${result?.payload?.message} `);

        setName('');
        setDescription('');
        setSelctId('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateProfil({ name, description, selectId, receiveId }));

      if (updateProfil.fulfilled.match(result)) {
        await dispatch(getProfils());
        handleClose();
        toast.success(`${result?.payload?.message} `);

        setName('');
        setDescription('');
        setSelctId('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getProfil(receiveEditId));
    } else {
      setName('');
      setDescription('');
      setSelctId('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && profil) {
      setName(profil?.strProname || '');
      setDescription(profil.strProdescription || '');
      setSelctId(profil.strProtype || '');
    }
  }, [profil, valueEdition]);

  useEffect(() => {
    if (valueEdition === 'editer' && profil) {
      dispatch(getPrivileges(listePrivilegeId));
    }
  }, []);

  const SaveProfilPrivilege = async () => {
    const response = await dispatch(createProfilPrivilege(receiveCheckedId));
    if (response.payload.reponse === 'success') {
      handleClose();
    } else {
      return;
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
    setReceiveCheckedId,
    receiveCheckedId,
    listeProfils,
    setSelctId,
    selectId,
    saveEnregistrementProfil,
    getProfil,
    profil,
    valueEdition,
    SaveProfilPrivilege
  };
}
