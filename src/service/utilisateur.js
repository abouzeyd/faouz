/* eslint-disable prettier/prettier */
import { BASEROOT } from './serveur';
import { getValueLocalStorage } from './globalFunction';

export const getLoginUtilisateur = () => {
  return getValueLocalStorage('loginUtilisateur') ?? false;
};

export const checkIsConnected = () => {
  if (!getLoginUtilisateur()) {
    return (window.location.href = BASEROOT + 'login');
  }
};
