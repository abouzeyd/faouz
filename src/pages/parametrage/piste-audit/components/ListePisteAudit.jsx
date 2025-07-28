/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import ModalEcole from './ModalPisteAudit';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import RenderActions from '../../../../components/RenderActions';
import { Alert } from 'antd';
import { setEdition, setReceiveEditId } from '../../../../store/parametrage/ecole';
import { deleteEcole } from '../../../../service/parametrage/ecole';
import { getPisteAudit } from '../../../../service/parametrage/listeprofil';
import { formatGlobalDate } from '../../../../service/globalFunction';

export default function ListeEcoles() {
  // Start State Area
  const [valeur, setValeur] = useState('');
  const dispatch = useDispatch();
  const { loading, error, receiveId, pisteAudit } = useSelector((state) => state.profil);

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
    dispatch(getEcoles());
  }, [dispatch]);

  const data = Array.isArray(pisteAudit)
    ? pisteAudit.map((user, idx) => ({
        key: user.lgPisid || idx,
        nom: user.strPislibelle,
        localisation: user.lgUticreatedid,
        email: user.strPistype,
        date_create: formatGlobalDate(user.dtPiscreated)
      }))
    : [];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data?.filter((data) => data?.nom?.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = async () => {
    const response = await dispatch(deleteEcole(receiveId?.key));

    if (response.payload.reponse === 'success') {
      setOpenModalDelete(false);
      dispatch(getEcoles());
    } else {
      <Alert message="Error Text" type="error" />;
    }
  };

  const handleVoir = (row) => {};

  const columns = [
    {
      title: 'Libellé',
      dataIndex: 'nom',
      key: 'nom',
      sorter: (a, b) => a?.nom?.localeCompare(b.nom),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Utilisateur',
      dataIndex: 'localisation',
      key: 'localisation',
      sorter: (a, b) => a?.localisation?.localeCompare(b.localisation),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Type piste',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a?.email?.localeCompare(b.email),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    },
    {
      title: 'Date',
      dataIndex: 'date_create',
      key: 'date_create',
      sorter: (a, b) => a?.date_create?.localeCompare(b.date_create),
      onHeaderCell: () => ({
        style: { background: '#f0f0f0', color: 'black', fontWeight: 'bold' }
      })
    }
  ];

  useEffect(() => {
    dispatch(getPisteAudit());
  }, []);

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
            placeholder="Rechercher une piste d'audite"
            value={valeur}
            onChange={handleChange}
            sx={{ backgroundColor: 'white', width: { xs: 450, sm: '70%', md: 800 } }}
          />
        </Box>
      </Box>

      <DataTable data={filterSaerch} loading={loading} error={error} columns={columns} />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <ModalEcole open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
