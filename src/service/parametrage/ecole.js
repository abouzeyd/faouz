import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getEcoles = createAsyncThunk('ecoles/getEcoles', async () => {
  const response = await axios.get(`${BASEURL}/ecole/listEcole`);
  return response.data;
});

export const createEcole = createAsyncThunk('ecoles/createEcoles', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgEcoid: '',
    strEcodescription: data.nameEcole ?? '',
    strEcolocalisation: data?.localisation ?? '',
    strEcomail: data?.email ?? '',
    strEcophone: data?.phone ?? ''
  };
  console.log(token);

  const response = await axios.post(`${BASEURL}/ecole/saveEcole`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateEcole = createAsyncThunk('ecoles/updateEcoles', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgEcoid: data?.receiveId.key ?? '',
    strEcodescription: data.nameEcole ?? '',
    strEcolocalisation: data?.localisation ?? '',
    strEcomail: data?.email ?? '',
    strEcophone: data?.phone ?? ''
  };
  console.log(token);

  const response = await axios.put(`${BASEURL}/ecole/updateEcole`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const getEcole = createAsyncThunk('ecoles/getecole', async (data) => {
  const response = await axios.get(`${BASEURL}/ecole/getEcole?LG_ECOID=${data}`);
  return response.data;
});

export const deleteEcole = createAsyncThunk('ecoles/deleteEcole', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/ecole/deleteEcole?LG_ECOID=${data}`,
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
