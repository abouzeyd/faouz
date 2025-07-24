/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalUtilisateur from './ModalUtilisateur';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUtilisateurs, deleteUtilisateur } from '../../../../service/parametrage/utilisateurs';
import RenderActions from '../../../../components/RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId } from '../../../../store/parametrage/utilisateur';

export default function ListeUtilisateurs() {
  // Start State Area
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { utilisateurs, loading, error, utilisateurupdate, receiveId } = useSelector((state) => state.utilisateur);

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
        key: user.lgUtiid || idx,
        nom: user.strUtiname,
        login: user.strUtilogin,
        email: user.strUtimail,
        telephone: user.strUtiphone
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteUtilisateur(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getUtilisateurs());
    } else {
      <Alert message="Error Text" type="error" />;
    }
  };

  const handleVoir = (row) => {};

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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a?.email?.localeCompare(b.email),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Téléphone',
      dataIndex: 'telephone',
      key: 'telephone',
      sorter: (a, b) => a?.telephone?.localeCompare(b.telephone),
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

  return (
    <div>
      <Box
        className="btn-search-area"
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Box sx={{ width: { xs: '90%', sm: '70%', md: '60%' } }}>
          <TextField
            fullWidth
            placeholder="Rechercher un utilisateur"
            value={valeur}
            onChange={handleChange}
            sx={{ backgroundColor: 'white', width: { xs: 450, sm: '70%', md: 800 } }}
          />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{
              paddingX: 3,
              paddingY: 1,
              width: { xs: 'auto', sm: 'auto' }
            }}
            onClick={() => {
              setOpenModalEditer(true);
              dispatch(setEdition(''));
            }}
          >
            Ajouter un utilisateur
          </Button>
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalUtilisateur open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
