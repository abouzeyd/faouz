/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Select from 'react-select';
import { useFormTypeListe } from './useFormTypeListe';
import DataTableListe from '../components/liste/dataTableListe';

export default function FormTypeListe({ handleClose }) {
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
    listeProfils,
    setSelctId,
    selectId,
    saveEnregistrementProfil,
    profil,
    valueEdition,
    nameListe,
    setNameListe,
    descriptionListe,
    setDescriptionListe,
    saveEnregistrementListe
  } = useFormTypeListe({ handleClose });

  return (
    <Box sx={{ display: 'flex', p: 4 }}>
      <Box sx={{ mr: 5 }}>
        <Box sx={{ mb: 4 }}>
          <TextField label="Nom " value={name} onChange={(e) => setName(e.target.value)} />
        </Box>

        <Box sx={{ mb: 2 }}>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>

        <Box sx={{ width: 200 }}>
          <p style={{ marginBottom: '12px' }}>Sélectionner</p>
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
          Enregistrer une type liste
        </Button>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ backgroundColor: 'white', pl: 5, borderRadius: 1, boxShadow: 1 }}>
          <div style={{ display: 'flex' }}>
            <Box sx={{ mt: 4, mb: 5, mr: 2 }}>
              <TextField label="Nom liste" value={nameListe} onChange={(e) => setNameListe(e.target.value)} style={{ width: 290 }} />
            </Box>
            <Box sx={{ mt: 4, mr: 2 }}>
              <TextField
                label="Description liste"
                value={descriptionListe}
                onChange={(e) => setDescriptionListe(e.target.value)}
                style={{ width: 290 }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{ mt: 4, mb: 5 }}
              disabled={valueEdition === 'editer' ? false : true}
              onClick={saveEnregistrementListe}
            >
              Enregistrer une liste
            </Button>
          </div>

          <div style={{ overflowY: 'auto', maxHeight: '310px' }}>
            <DataTableListe />
          </div>
        </Box>
      </Box>
    </Box>
  );
}
