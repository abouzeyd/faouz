import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createProfil, getProfils, updateProfil, getProfil } from '../../../../service/parametrage/listeprofil';
import { getPrivileges } from '../../../../service/parametrage/privilege';

export function useFomProfil({ handleClose }) {
  const { listeProfils, createLoading, createError, receiveEditId, valueEdition, receiveId, profil } = useSelector((state) => state.profil);
  const { listePrivileges } = useSelector((state) => state.privilege);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [selectId, setSelctId] = useState('');
  const [receiveCheckedId, setReceiveCheckedId] = useState([]);
  const [description, setDescription] = useState('');
  const [privilege, setPrivilege] = useState(null);
  const [page, setPage] = useState(1);

  const options = [
    { label: 'Métier', value: '1' },
    { label: 'Système', value: '2' }
  ];

  console.log({ listePrivileges });

  const valueChecked = [
    { label: 'label1', value: 1 },
    { label: 'label2', value: 2 },
    { label: 'label3', value: 3 },
    { label: 'label4', value: 4 },
    { label: 'label5', value: 5 },
    { label: 'label6', value: 6 },
    { label: 'label7', value: 7 },
    { label: 'label8', value: 8 },
    { label: 'label9', value: 9 },
    { label: 'label10', value: 10 },
    { label: 'label11', value: 11 },
    { label: 'label12', value: 12 }
  ];

  console.log({ receiveId });

  const itermsPerPage = 5;
  const totalPages = Math.ceil(listePrivileges.length / itermsPerPage);

  const paginatedItems = listePrivileges.slice((page - 1) * itermsPerPage, page * itermsPerPage);

  const saveEnregistrementProfil = async () => {
    if (!name.trim() || !description.trim() || !selectId.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createProfil({ name, description, selectId }));

      if (createProfil.fulfilled.match(result)) {
        await dispatch(getProfils());
        handleClose();
        setName('');
        setDescription('');
        setSelctId('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateProfil({ name, description, selectId, receiveId }));

      if (updateProfil.fulfilled.match(result)) {
        await dispatch(getProfils());
        handleClose();
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
    dispatch(getPrivileges());
  }, []);

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
    profil
  };
}
