/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getTypeListes = createAsyncThunk('typeListe/gettypeListe', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/typeliste/listTypeliste`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const createTypeListe = createAsyncThunk('typeliste/saveTypeliste', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgTylid: '',
    strTylname: data?.name ?? '',
    strTyldescription: data?.description ?? '',
    strTylspecific: data?.selectId ?? ''
  };

  const response = await axios.post(`${BASEURL}/typeliste/saveTypeliste`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const updateTypeListe = createAsyncThunk('typeliste/updateTypeliste', async (data) => {
  console.log({ data });

  const token = getValueLocalStorage('user');
  const jsonData = {
    lgTylid: data?.receiveId.key ?? '',
    strTylname: data?.name ?? '',
    strTyldescription: data?.description ?? '',
    strTylspecific: data?.selectId ?? ''
  };
  const response = await axios.put(`${BASEURL}/typeliste/updateTypeliste`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const deleteTypeListe = createAsyncThunk('typeliste/deleteTypeliste', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/typeliste/deleteTypeliste?LG_TYLID=${data}`,
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

export const getTypeliste = createAsyncThunk('typeliste/getTypeliste', async (data) => {
  const response = await axios.get(`${BASEURL}/typeliste/getTypeliste?LG_TYLID=${data}`);
  return response.data;
});

// CREATE LISTE

export const createListe = createAsyncThunk('liste/saveliste', async (data) => {
  const token = getValueLocalStorage('user');
  const jsonData = {
    lgLstid: '',
    lgTylid: data?.typeListe?.lgTylid ?? '',
    lgEcoid: '01',
    strLstvalue: data?.nameListe ?? '',
    strLstdescription: data?.descriptionListe ?? '',
    strLstothervalue: '',
    strLstothervalue1: '',
    strLstothervalue2: ''
  };

  const response = await axios.post(`${BASEURL}/liste/saveListe`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const getListes = createAsyncThunk('liste/listListe', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.get(`${BASEURL}/liste/listListe`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const getListe = createAsyncThunk('liste/getListe', async (data) => {
  const response = await axios.get(`${BASEURL}/liste/getListe?LG_LSTID=${data}`);
  return response.data;
});

export const updateListe = createAsyncThunk('liste/updateListe', async (data) => {
  console.log({ data });

  const token = getValueLocalStorage('user');
  const jsonData = {
    lgLstid: data?.liste?.lgLstid ?? '',
    lgTylid: data?.typeListe?.lgTylid ?? '',
    lgEcoid: '01',
    strLstvalue: data?.nameListe ?? '',
    strLstdescription: data?.descriptionListe ?? '',
    strLstothervalue: '',
    strLstothervalue1: '',
    strLstothervalue2: ''
  };
  const response = await axios.put(`${BASEURL}/liste/updateListe`, jsonData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.strUtitoken}`
    }
  });
  return response.data;
});

export const deleteListe = createAsyncThunk('liste/deleteListe', async (data) => {
  const token = getValueLocalStorage('user');
  const response = await axios.put(
    `${BASEURL}/liste/deleteListe?LG_LSTID=${data}`,
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
