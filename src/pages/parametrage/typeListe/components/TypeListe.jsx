/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalTypeListe from './ModalTypeListe';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getTypeListes, deleteTypeListe } from '../../../../service/parametrage/typeListe';
import RenderActions from './RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId } from '../../../../store/parametrage/typeListe';
import toast from 'react-hot-toast';

export default function TypeListe() {
  // Start State Area
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { typeListes, loading, error, utilisateurupdate, receiveId, receiveChecked } = useSelector((state) => state.TypeListe);

  console.log({ typeListes });

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

  const handleCloseModalEditer = () => setOpenModalEditer(false);

  const data = Array.isArray(typeListes)
    ? typeListes.map((user, idx) => ({
        key: user.lgTylid || idx,
        nom: user?.strTylname,
        description: user.strTyldescription,
        spec: user.strTylspecific
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteTypeListe(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getTypeListes());
      toast.success(response?.payload?.message);
    } else {
      toast.success(response?.payload?.message);
    }
  };

  useEffect(() => {
    dispatch(getTypeListes());
  }, []);

  const handleVoir = (row) => {};

  const columns = [
    {
      title: 'Pays',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a?.nom?.localeCompare(b.nom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a?.description?.localeCompare(b.description),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },

    {
      title: 'Specifications',
      dataIndex: 'spec',
      key: 'spec',
      sorter: (a, b) => a?.spec?.localeCompare(b.spec),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },

    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
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
            placeholder="Rechercher un profil"
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
              // dispatch(getPrivileges());
            }}
          >
            Ajouter une type liste
          </Button>
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalTypeListe open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
