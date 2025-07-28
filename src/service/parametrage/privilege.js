import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from '../serveur';
import { getValueLocalStorage } from '../globalFunction';

export const getPrivileges = createAsyncThunk('privilege/getprivileges', async () => {
  const response = await axios.get(`${BASEURL}/privilege/listPrivilege`);
  return response.data;
});
