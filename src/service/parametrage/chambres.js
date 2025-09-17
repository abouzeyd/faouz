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
    lgChaid: '',
    lgEleid: data?.selectId ?? '',
    strChadescription: data?.description ?? '',
    strChanumbat: data?.batiment ?? '',
    // strChanumbat: data?.nmbrpersonnedansChambre ?? '',
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
    lgEleid: data?.receiveId.key,
    strChanumbat: data?.batiment ?? '',
    strChadescription: data?.description ?? '',
    strChanbrelit: data?.nmbrpersonnedansChambre ?? '',
    lgEcoid: data?.selectId ?? '',
    lgChaid: data?.receiveEditId,
    strEleve: 'test'
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
    `${BASEURL}/chambre/deleteChambre?LG_CHAID=${data}`,
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
  const response = await axios.get(`${BASEURL}/chambre/getChambre?LG_CHAID=${data}`);
  return response.data;
});
