/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getEleves = createAsyncThunk('eleve/listEleves', async () => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/eleve/listChambre`, {
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
    lgChaid: '',
    lgEleid: data?.selectId ?? '',
    strChadescription: data?.description ?? '',
    strChanumbat: data?.batiment ?? '',
    // strChanumbat: data?.nmbrpersonnedansChambre ?? '',
    strChanumlit: 'test'
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
  const jsonData = {
    lgEleid: data?.receiveId.key,
    strChanumbat: data?.batiment ?? '',
    strChadescription: data?.description ?? '',
    strChanbrelit: data?.nmbrpersonnedansChambre ?? '',
    lgEcoid: data?.selectId ?? '',
    lgChaid: data?.receiveEditId,
    strEleve: 'test'
  };
  const response = await axios.put(`${BASEURL}/eleve/updateChambre`, jsonData, {
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
    `${BASEURL}/eleve/deleteChambre?LG_CHAID=${data}`,
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
  const response = await axios.get(`${BASEURL}/eleve/getChambre?LG_CHAID=${data}`);
  return response.data;
});
