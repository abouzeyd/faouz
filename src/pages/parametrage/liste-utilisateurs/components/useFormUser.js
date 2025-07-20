import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUtilisateurs, deleteUtilisateur } from '../../../../service/parametrage/utilisateurs';
import RenderActions from '../../../../components/RenderActions';
import { setReceiveEditId } from '../../../../store/parametrage/utilisateur';
import { setEdition } from '../../../../store/parametrage/utilisateur';
import { Alert } from 'antd';

export default function useFormUser() {
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { utilisateurs, loading, error } = useSelector((state) => state.utilisateur);

  // Suppression
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState('');
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  // Edition
  const [editerBtn, setEditerBtn] = useState('');
  const [openModalEditer, setOpenModalEditer] = useState(false);

  //
  const handleOpenModalEditer = (record) => {
    dispatch(setEdition('editer'));
    dispatch(setReceiveEditId(record?.key));
    setOpenModalEditer(true);
  };

  //
  const handleCloseModalEditer = () => setOpenModalEditer(false);

  useEffect(() => {
    dispatch(getUtilisateurs());
  }, [dispatch]);

  const data = Array.isArray(utilisateurs)
    ? utilisateurs.map((user, idx) => ({
        key: user.id || idx,
        nom: user.strUtiname,
        login: user.strUtilogin
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteUtilisateur(deleteBtn?.key));
    if (response.success === true) {
      setOpenModalDelete(false);
    } else {
      <Alert message="Error Text" type="error" />;
    }
  };

  const handleVoir = (row) => {
    console.log('Voir', row);
  };

  const columns = [
    {
      title: 'Nom utilisateur',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a?.nom?.localeCompare(b.nom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Login',
      dataIndex: 'login',
      key: 'login',
      sorter: (a, b) => a?.login?.localeCompare(b.login),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },

    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 200,
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      }),
      render: (_, record) => {
        return (
          <RenderActions
            loading={loading}
            record={record}
            setEditerBtn={setEditerBtn}
            handleOpenModalEditer={handleOpenModalEditer}
            handleVoir={handleVoir}
            setDeleteBtn={setDeleteBtn}
            handleOpenModalDelete={handleOpenModalDelete}
          />
        );
      }
    }
  ];
  return {
    columns,
    openModalDelete,
    handleCloseModalEditer,
    handleChange,
    deleteButton,
    editerBtn,
    openModalEditer,
    handleCloseModalDelete,
    setOpenModalEditer,
    setEdition,
    setEditerBtn,
    deleteBtn,
    filterSaerch,
    loading,
    dispatch
  };
}
