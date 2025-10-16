/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage, formatGlobalDateTranslate } from '../globalFunction';

export const getEleves = createAsyncThunk('eleve/listEleve', async () => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/eleve/listEleve`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const createEleve = createAsyncThunk('eleve/saveEleve', async (data) => {
  const token = getValueLocalStorage('user');

  const jsonData = {
    lgEleid: '', // vide car nouvel élève
    strElenom: data?.nom ?? '',
    strEleprenom: data?.prenom ?? '',
    strElesexe: data?.receiveValueSexe ?? '',
    dtElenaissance: formatGlobalDateTranslate(data?.dteNaissance) ?? '', // format YYYY-MM-DD
    strElelieunaissance: data?.lieuNaissance ?? '',
    strElerefextrait: data?.refExtrait ?? '',
    strElenumpiece: data?.numPiece ?? '',
    strElenationalite: data?.nationalite ?? '', // si tu as ce champ dans ton form
    strEleprovenance: data?.provenance ?? '',
    strElenompere: data?.nomPere ?? '',
    strEleprofesionpere: data?.profession ?? '',
    strElecontactpere: data?.contactPere ?? '',
    strElenommere: data?.nomMere ?? '',
    strEleprofesionmere: data?.professionMere ?? '',
    strElecontactmere: data?.contactMere ?? '',
    strEletype: data?.receiveValueTypeEleve ?? '', // type élève
    strElepriseencharge: data?.receiveIdCharge ?? '',
    lgEnsid: data?.selectId ?? '', // école
    strElehalaqate: data?.halakat ?? '',
    lgChaid: data?.selectChambreId ?? '', // si tu stockes la chambre sélectionnée
    strElenumlit: data?.numeroLit ?? '',
    strElenumbat: data?.batiment ?? '',
    dtEleinscription: formatGlobalDateTranslate(data?.dateInscription) ?? '', // format YYYY-MM-DD
    strEleniveau: data?.valueNiveauEtude ?? '',
    strElecoran: data?.valueCoranEleve ?? '',
    strElenationalite: data?.selectNationaliteId ?? ''
  };

  const response = await axios.post(`${BASEURL}/eleve/saveEleve`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateEleve = createAsyncThunk('eleve/updateEleve', async (data) => {
  const token = getValueLocalStorage('user');

  console.log({ data });

  const jsonData = {
    lgEleid: data?.receiveEditId ?? '', // ici tu passes l'ID de l'élève existant
    strElenom: data?.nom ?? '',
    strEleprenom: data?.prenom ?? '',
    strElesexe: data?.receiveValueSexe ?? '',
    dtElenaissance: data?.dteNaissance,
    strElelieunaissance: data?.lieuNaissance ?? '',
    strElerefextrait: data?.refExtrait ?? '',
    strElenumpiece: data?.numPiece ?? '',
    strElenationalite: data?.nationalite ?? '',
    strEleprovenance: data?.provenance ?? '',
    strElenompere: data?.nomPere ?? '',
    strEleprofesionpere: data?.profession ?? '',
    strElecontactpere: data?.contactPere ?? '',
    strElenommere: data?.nomMere ?? '',
    strEleprofesionmere: data?.professionMere ?? '',
    strElecontactmere: data?.contactMere ?? '',
    strEletype: data?.receiveValueTypeEleve ?? '',
    strElepriseencharge: data?.receiveIdCharge ?? '',
    lgEnsid: data?.selectId ?? '',
    strElehalaqate: data?.halakat ?? '',
    lgChaid: data?.selectChambreId ?? '',
    strElenumlit: data?.numeroLit ?? '',
    strElenumbat: data?.batiment ?? '',
    dtEleinscription: data?.dateInscription ?? '',
    strEleniveau: data?.valueNiveauEtude ?? '',
    strElecoran: data?.valueCoranEleve ?? '',
    strElenationalite: data?.selectNationaliteId ?? ''
  };

  const response = await axios.put(`${BASEURL}/eleve/updateEleve`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });

  return response.data;
});

export const deleteEleve = createAsyncThunk('eleve/deleteEleve', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/eleve/deleteEleve?LG_ELEID=${data}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.strUtitoken}`
      }
    }
  );
  return response.data;
});

export const getEleve = createAsyncThunk('eleve/getEleve', async (data) => {
  const response = await axios.get(`${BASEURL}/eleve/getEleve?LG_ELEID=${data}`);
  return response.data;
});
