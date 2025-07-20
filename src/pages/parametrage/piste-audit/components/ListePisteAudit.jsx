/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DataTable from '../../../../components/DataTable';
import DoyouWantDelete from '../../../../components/modaldoyouwantdelet';
import Modals from '../../../../components/Modal';
import { Button, TextField, Box } from '@mui/material';

export default function ListeUtilisateurs() {
  // Start State Area
  const [valeur, setValeur] = useState('');

  // Suppression
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState('');
  const handleOpenModalDelete = () => setOpenModalDelete(true);
  const handleCloseModalDelete = () => setOpenModalDelete(false);

  // Edition
  const [editerBtn, setEditerBtn] = useState('');
  const [openModalEditer, setOpenModalEditer] = useState(false);
  const handleOpenModalEditer = () => setOpenModalEditer(true);
  const handleCloseModalEditer = () => setOpenModalEditer(false);

  // End State Area

  useEffect(() => {
    if (editerBtn.length !== 0) {
      // appeler la fonction de chargement des données dans les inputs lorsque nous sommes en modification
      alert('welcome');
    }
  }, [editerBtn.length]);

  // Fonction

  const data = [
    {
      key: '1',
      nom: 'John Brown',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    },
    {
      key: '2',
      nom: 'Jim Green',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    },
    {
      key: '3',
      nom: 'Joe Black',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    },
    {
      key: '4',
      nom: 'Jim Red',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    },
    {
      key: '5',
      nom: 'Jim Red',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    },
    {
      key: '6',
      nom: 'Jim Red',
      lastName: 'Eric',
      occupation: "Directeur d'étude"
    }
  ];

  const handleChange = (event) => {
    setValeur(event.target.value);
  };

  const filterSaerch = data.filter((data) => data.nom.toLocaleLowerCase().includes(valeur.toLocaleLowerCase()));

  const deleteButton = () => {
    console.log('test', deleteBtn);
    setOpenModalDelete(false);
  };

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
            placeholder="Rechercher une piste"
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
              setEditerBtn('');
            }}
          >
            Ajouter un audit
          </Button>
        </Box>
      </Box>

      <DataTable
        handleOpenModalDelete={handleOpenModalDelete}
        handleOpenModalEditer={handleOpenModalEditer}
        setDeleteBtn={setDeleteBtn}
        setEditerBtn={setEditerBtn}
        data={filterSaerch}
      />

      <DoyouWantDelete open={openModalDelete} handleClose={handleCloseModalDelete} deleteButton={deleteButton} deleteBtn={deleteBtn} />

      <Modals open={openModalEditer} handleClose={handleCloseModalEditer} editerBtn={editerBtn} setEditerBtn={setEditerBtn} />
    </div>
  );
}
