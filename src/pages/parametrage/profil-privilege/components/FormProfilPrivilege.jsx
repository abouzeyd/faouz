/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Select from 'react-select';
import { useFomProfil } from './useFormProfilPrivilege';

export default function FormProfilPrivilege({ handleClose }) {
  const {
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
    setReceiveCheckedId,
    receiveCheckedId,
    listeProfils,
    setSelctId,
    selectId,
    saveEnregistrementProfil,
    profil,
    valueEdition
  } = useFomProfil({ handleClose });

  const handleCheckboxChange = (_, item) => {
    setReceiveCheckedId(
      (prev) =>
        prev.includes(item?.lgPriid)
          ? prev.filter((v) => v !== item?.lgPriid) // Retirer si déjà présent
          : [...prev, item?.lgPriid] // Ajouter sinon
    );
  };

  return (
    <Box sx={{ display: 'flex', p: 4 }}>
      <Box sx={{ mr: 5 }}>
        <Box sx={{ mb: 4 }}>
          <TextField label="Nom du profil" value={name} onChange={(e) => setName(e.target.value)} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>

        <Box sx={{ width: 200 }}>
          <p style={{ marginBottom: '12px' }}>Sélectionner un profil</p>
          <Select
            options={options}
            value={options.find((option) => option.value === selectId)}
            onChange={(option) => {
              setSelctId(option ? option.value : '');
            }}
            placeholder="choisir un privilège"
          />
        </Box>
        <Button variant="contained" sx={{ mt: 6 }} onClick={saveEnregistrementProfil}>
          Enregistrer un profil
        </Button>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: 'white', pl: 5, borderRadius: 1, boxShadow: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10, marginRight: 25 }}>
            <Button variant="contained" sx={{ mt: 4 }} disabled={valueEdition === 'editer' ? false : true}>
              Enregistrer des privilèges
            </Button>
          </div>

          <FormGroup>
            {/* En-tête de colonnes */}
            <Box sx={{ display: 'flex', fontWeight: 'bold', mb: 1, mt: 1 }}>
              <Box sx={{ width: '40px' }} /> {/* espace pour la checkbox */}
              <Box sx={{ flex: 1, textAlign: 'center', color: 'gray' }}>Nom </Box>
              <Box sx={{ flex: 1, textAlign: 'center', color: 'gray' }}>Description</Box>
              <Box sx={{ flex: 1, textAlign: 'center', color: 'gray' }}>Type</Box>
            </Box>

            {/* Lignes de données */}
            {paginatedItems.map((item) => (
              <Box key={item.lgPriid} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Checkbox checked={receiveCheckedId.includes(item.lgPriid)} onChange={(e) => handleCheckboxChange(e, item)} />
                <Box sx={{ flex: 1, textAlign: 'center' }}>{item.strPriname}</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>{item.strPridescription}</Box>
                <Box sx={{ flex: 1, textAlign: 'center' }}>{item.strPritype}</Box>
              </Box>
            ))}
          </FormGroup>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} sx={{ mr: 1 }}>
              {'<<<'}
            </Button>
            <span style={{ alignSelf: 'center' }}>
              {page} / {totalPages}
            </span>
            <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} sx={{ ml: 1 }}>
              {'>>>'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
