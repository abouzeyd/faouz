/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalChambre from './ModalEleve';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getEleves, deleteEleve } from '../../../../service/parametrage/eleves';
import RenderActions from './RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId } from '../../../../store/parametrage/eleves';
import toast from 'react-hot-toast';
import { formatGlobalDate } from '../../../../service/globalFunction';

export default function ListeEleve() {
  // Start State Area
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { listeEleves, loading, error, receiveEditId, receiveId } = useSelector((state) => state.eleve);

  console.log({ receiveId });

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
    dispatch(getEleves());
  }, [dispatch]);

  const data = Array.isArray(listeEleves)
    ? listeEleves.map((student, idx) => ({
        key: student.lgEleid || idx,
        nom: student?.strElenom,
        prenom: student.strEleprenom,
        sexe: student.strElesexe,
        datenaissance: formatGlobalDate(student.dtElenaissance),
        lieunaissance: student.strElelieunaissance,
        batiment: student?.strElenumbat
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteEleve(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getEleves());
      toast.success(response?.payload?.message);
    } else {
      toast.success(response?.payload?.message);
    }
  };

  const handleVoir = (row) => {};

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a?.nom?.localeCompare(b.nom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Prénoms',
      dataIndex: 'prenom',
      key: 'prenom',
      sorter: (a, b) => a?.prenom?.localeCompare(b.prenom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      key: 'sexe',
      sorter: (a, b) => a?.sexe?.localeCompare(b.sexe),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Date de naissance',
      dataIndex: 'datenaissance',
      key: 'datenaissance',
      sorter: (a, b) => a?.datenaissance?.localeCompare(b.datenaissance),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Lieu de naissance',
      dataIndex: 'lieunaissance',
      key: 'lieunaissance',
      sorter: (a, b) => a?.lieunaissance?.localeCompare(b.lieunaissance),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },

    {
      title: 'Batiment',
      dataIndex: 'batiment',
      key: 'batiment',
      sorter: (a, b) => a?.batiment?.localeCompare(b.batiment),
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
            Enregistrer un élève
          </Button>
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalChambre open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
