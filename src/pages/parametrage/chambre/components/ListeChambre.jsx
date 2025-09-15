/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalChambre from './ModalChambre';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getChambres, deleteChambre } from '../../../../service/parametrage/chambres';
import RenderActions from './RenderActions';
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
        batiment: user?.batiment,
        desc: user.desc,
        numLit: user.numLit,
        nbrechambre: user.nbrechambre,
        chefchambre: user.chefchambre
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.batiment?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

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
      title: 'Batiment',
      dataIndex: 'batiment',
      key: 'batiment',
      sorter: (a, b) => a?.batiment?.localeCompare(b.batiment),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      sorter: (a, b) => a?.desc?.localeCompare(b.desc),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Nombre de personne dans la chambre',
      dataIndex: 'nbrechambre',
      key: 'nbrechambre',
      sorter: (a, b) => a?.nbrechambre?.localeCompare(b.nbrechambre),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'chef de chambre',
      dataIndex: 'chefchambre',
      key: 'chefchambre',
      sorter: (a, b) => a?.chefchambre?.localeCompare(b.chefchambre),
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
            Ajouter une chambre
          </Button>
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalChambre open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
