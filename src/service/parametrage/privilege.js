/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

// export const getPrivileges = createAsyncThunk('privilege/getprivileges', async () => {
//   const response = await axios.get(`${BASEURL}/privilege/listPrivilege`);
//   return response.data;
// });

export const getPrivileges = createAsyncThunk('privilege/getprivileges', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/profilPrivilege/listProfilPrivilege?LG_PROID=${data}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const createProfilPrivilege = createAsyncThunk('profilPrivilege/createProfilPrivilege', async (data, thunkAPI) => {
  const state = thunkAPI.getState();

  const receiveId = state.profil.receiveId;

  console.log({ receiveId });

  const token = getValueLocalStorage('user');
  const jsonData = {
    lgId: receiveId?.key,
    listids: data
  };

  const response = await axios.post(`${BASEURL}/profilPrivilege/saveProfilPrivilege`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});
