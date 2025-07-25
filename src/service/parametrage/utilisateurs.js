import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getUtilisateurs = createAsyncThunk('utilisateurs/getUtilisateurs', async () => {
  const response = await axios.get(`${BASEURL}/utilisateur/listUtilisateur`);
  return response.data;
});

export const createUtilisateur = createAsyncThunk('utilisateurs/createutilisateur', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgUtiid: '',
    strUtiname: data?.nameUser ?? '',
    strUtilogin: data?.loginUser ?? '',
    strUtipassword: data?.password ?? '',
    strUtiphone: data?.phone ?? '',
    strUtimail: data?.email ?? '',
    lgEcoid: data?.selectId ?? ''
  };
  console.log(token);

  const response = await axios.post(`${BASEURL}/utilisateur/saveUtilisateur`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateUtilisateur = createAsyncThunk('utilisateurs/updateUtilisateur', async (data) => {
  console.log({ data });

  const token = getValueLocalStorage('user');
  const jsonData = {
    lgUtiid: data?.receiveId.key,
    lgEcoid: data?.selectId ?? '',
    strUtiname: data?.nameUser,
    strUtilogin: data?.loginUser,
    strUtiphone: data?.phone,
    strUtimail: data?.email
  };
  const response = await axios.put(`${BASEURL}/utilisateur/updateUtilisateur`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const deleteUtilisateur = createAsyncThunk('utilisateurs/deleteUtilisateur', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/utilisateur/deleteUtilisateur?LG_UTIID=${data}`,
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

export const getUtilisateur = createAsyncThunk('utilisateurs/getUtilisateur', async (data) => {
  const response = await axios.get(`${BASEURL}/utilisateur/getUtilisateur?LG_UTIID=${data}`);
  return response.data;
});
