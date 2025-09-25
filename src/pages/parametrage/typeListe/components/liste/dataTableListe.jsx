/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../../components/DataTable';
import DoyouWantDelete from '../../../../../components/modaldoyouwantdelet';
// import ModalTypeListe from './ModalTypeListe';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteListe, getListes } from '../../../../../service/parametrage/typeListe';
// import { getPrivileges } from '../../../../service/parametrage/privilege';
import RenderActions from './RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId, setReceiveCheckedId } from '../../../../../store/parametrage/profil';
import toast from 'react-hot-toast';

export default function TableListe() {
  // Start State Area
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { listes, loading, error, utilisateurupdate, receiveId, receiveChecked } = useSelector((state) => state.TypeListe);

  console.log({ listes });

  // Suppression
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState('');
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  // Edition
  const [editerBtn, setEditerBtn] = useState('');
  const [openModalEditer, setOpenModalEditer] = useState(false);

  //

  const handleCloseModalEditer = () => setOpenModalEditer(false);

  const data = Array.isArray(listes)
    ? listes.map((user, idx) => ({
        key: user.lgLstid || idx,
        nom: user?.strLstvalue,
        description: user.strLstdescription
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteListe(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getListes());
      toast.success(response?.payload?.message);
    } else {
      toast.success(response?.payload?.message);
    }
  };

  useEffect(() => {
    dispatch(getListes());
  }, []);

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
      title: 'Descriptions',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a?.description?.localeCompare(b.description),
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
        console.log({ record });

        return (
          <RenderActions
            loading={loading}
            record={record}
            setEditerBtn={setEditerBtn}
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
            placeholder="Rechercher une liste"
            value={valeur}
            onChange={handleChange}
            sx={{ backgroundColor: 'white', width: { xs: 450, sm: '70%', md: 800 } }}
          />
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      {/* <ModalTypeListe open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} /> */}
    </div>
  );
}
