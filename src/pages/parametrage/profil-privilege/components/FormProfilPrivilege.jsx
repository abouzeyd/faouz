/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Select from 'react-select';
import { useFomProfil } from './useFormProfile.';

export default function FormProfilPrivilege() {
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
    receiveCheckedId
  } = useFomProfil();

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setReceiveCheckedId(
      (prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value) // Retirer si déjà présent
          : [...prev, value] // Ajouter sinon
    );
  };

  console.log({ receiveCheckedId });

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ mr: 5 }}>
        <Box sx={{ mb: 2 }}>
          <TextField label="Nom du profil" value={name} onChange={(e) => setName(e.target.value)} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>

        <Box sx={{ width: 200 }}>
          <span style={{ marginBottom: '12px' }}>Sélectionner un profil</span>
          <Select options={options} value={privilege} onChange={setPrivilege} placeholder="choisir un privilège" />
        </Box>
        <Button variant="contained" sx={{ mt: 6 }}>
          Enregistrer
        </Button>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: 'white', pl: 5, borderRadius: 1, boxShadow: 1 }}>
          <FormGroup>
            {paginatedItems.map((item, idx) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  value={item.value} // ou item.id si tu as un id
                  onChange={(e) => handleCheckboxChange(e, item)}
                />
                <span onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', userSelect: 'none', marginLeft: 55 }}>
                  {item.label}
                </span>
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
        <Button variant="contained" sx={{ mt: 6 }}>
          Enregistrer
        </Button>
      </Box>
    </Box>
  );
}
