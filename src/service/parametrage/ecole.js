import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';

export const getEcoles = createAsyncThunk('ecoles/getEcoles', async () => {
  const response = await axios.get(`${BASEURL}/ecole/listEcole`);
  return response.data;
});
