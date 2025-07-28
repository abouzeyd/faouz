import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getProfils = createAsyncThunk('profil/getprofils', async () => {
  const response = await axios.get(`${BASEURL}/profil/listProfil`);
  return response.data;
});

export const createProfil = createAsyncThunk('profil/createprofil', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgProid: '',
    strProname: data?.name ?? '',
    strProdescription: data?.description ?? '',
    strProtype: data?.selectId ?? ''
  };
  console.log(token);

  const response = await axios.post(`${BASEURL}/profil/saveProfil`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateProfil = createAsyncThunk('profil/updateProfil', async (data) => {
  console.log({ data });

  const token = getValueLocalStorage('user');
  const jsonData = {
    lgProid: data?.receiveId.key ?? '',
    strProname: data?.name ?? '',
    strProdescription: data?.description ?? '',
    strProtype: data?.selectId ?? ''
  };
  const response = await axios.put(`${BASEURL}/profil/updateProfil`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const deleteProfil = createAsyncThunk('profil/deleteProfil', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/profil/deleteProfil?LG_PROID=${data}`,
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

export const getProfil = createAsyncThunk('profil/getProfil', async (data) => {
  const response = await axios.get(`${BASEURL}/profil/getProfil?LG_PROID=${data}`);
  return response.data;
});

// PISTE AUDIT

export const getPisteAudit = createAsyncThunk('piste/getpiste', async () => {
  const response = await axios.get(`${BASEURL}/piste/listPiste`);
  return response.data;
});
