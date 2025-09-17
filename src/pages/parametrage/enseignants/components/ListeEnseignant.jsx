/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalEnseignant from './ModalEnseignant';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getChambres, deleteChambre } from '../../../../service/parametrage/chambres';
import RenderActions from './RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId } from '../../../../store/parametrage/utilisateur';

export default function ListeEleve() {
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
  const [openModalProfilUser, setOpenModalProfilUser] = useState(false);

  //
  const handleOpenModalEditer = (record) => {
    dispatch(setEdition('editer'));
    dispatch(setReceiveEditId(record?.key));
    setOpenModalEditer(true);
  };

  const handleOpenModalProfilUser = (record) => {
    dispatch(setReceiveEditId(record?.key));
    setOpenModalProfilUser(true);
  };
  //
  const handleCloseModalEditer = () => setOpenModalEditer(false);
  const handleCloseModalProfilUser = () => setOpenModalProfilUser(false);

  useEffect(() => {
    dispatch(getChambres());
  }, [dispatch]);

  const data = Array.isArray(utilisateurs)
    ? utilisateurs.map((user, idx) => ({
        key: user.lgUtiid || idx,
        nom: user?.nom,
        prenom: user.prenom,
        numero: user.numero,
        dateNaissance: user.dateNaissance,
        anneeEnseignement: user.anneeEnseignement,
        selectGenreEleveId: user.selectGenreEleveId
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteChambre(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getChambres());
    } else {
      <Alert message="Error Text" type="error" />;
    }
  };

  const handleVoir = (row) => {};

  const columns = [
    {
      title: `Nom de l'enseignant`,
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a?.nom?.localeCompare(b.nom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: `Prénom de l'enseignant`,
      dataIndex: 'prenom',
      key: 'prenom',
      sorter: (a, b) => a?.prenom?.localeCompare(b.prenom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Numéro ',
      dataIndex: 'numero',
      key: 'numero',
      sorter: (a, b) => a?.numero?.localeCompare(b.numero),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Date de naissance',
      dataIndex: 'dateNaissance',
      key: 'dateNaissance',
      sorter: (a, b) => a?.dateNaissance?.localeCompare(b.dateNaissance),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: `Année d'enseignement`,
      dataIndex: 'anneeEnseignement',
      key: 'anneeEnseignement',
      sorter: (a, b) => a?.anneeEnseignement?.localeCompare(b.anneeEnseignement),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: `Genre`,
      dataIndex: 'selectGenreEleveId',
      key: 'selectGenreEleveId',
      sorter: (a, b) => a?.selectGenreEleveId?.localeCompare(b.selectGenreEleveId),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },

    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
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
            handleOpenModalProfilUser={handleOpenModalProfilUser}
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
            placeholder="Rechercher un élève"
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
            Ajouter un enseignant
          </Button>
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalEnseignant open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
