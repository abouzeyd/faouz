/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getChambres = createAsyncThunk('chambre/listChambre', async () => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/chambre/listChambre`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const createChambre = createAsyncThunk('chambre/saveChambre', async (data) => {
  const token = getValueLocalStorage('user');

  const jsonData = {
    lgUtiid: '',
    strChaBatiment: data?.batiment ?? '',
    StrChadescription: data?.description ?? '',
    strChaNombre: data?.nmbrpersonnedansChambre ?? '',
    lgEcoid: data?.selectId ?? '',

    strChanumlit: 'test'
  };

  const response = await axios.post(`${BASEURL}/chambre/saveChambre`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateChambre = createAsyncThunk('chambre/updateChambre', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgUtiid: data?.receiveId.key,
    strChaBatiment: data?.batiment ?? '',
    StrChadescription: data?.description ?? '',
    strChaNombre: data?.nmbrpersonnedansChambre ?? '',
    lgEcoid: data?.selectId ?? '',

    strChanumlit: 'test'
  };
  const response = await axios.put(`${BASEURL}/chambre/updateChambre`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const deleteChambre = createAsyncThunk('chambre/deleteChambre', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/chambre/deleteChambre?LG_UTIID=${data}`,
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

export const getChambre = createAsyncThunk('chambre/getChambre', async (data) => {
  const response = await axios.get(`${BASEURL}/chambre/getChambre?LG_UTIID=${data}`);
  return response.data;
});
