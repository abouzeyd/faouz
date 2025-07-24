/* eslint-disable prettier/prettier */
import React from 'react';
import axios from 'axios';
import { BASEURL } from './serveur';
import TokenService from './tokenService';
import { getValueLocalStorage } from '../service/globalFunction';
import { purgeStorage } from '../service/globalFunction';

// Fonction de connexion améliorée
export const connexion = async (STR_UTILOGIN, STR_UTIPASSWORD) => {
  try {
    const params = new URLSearchParams();
    params.append('STR_UTILOGIN', STR_UTILOGIN);
    params.append('STR_UTIPASSWORD', STR_UTIPASSWORD);

    const response = await axios.post(`${BASEURL}/authentification/doconnexion`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.data.success) {
      const { accessToken, refreshToken, user } = response.data;
      TokenService.setTokens(accessToken, refreshToken);
      TokenService.setUser(user);
    }

    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

export const deconnexion = async (navigate) => {
  const token = getValueLocalStorage('user').strUtitoken;
  if (!token) {
    navigate('/login', { replace: true });
    return;
  }

  try {
    await axios.post(
      `${BASEURL}/authentification/dodisconnect`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    navigate('/login', { replace: true });
    purgeStorage('user');
    purgeStorage('persist:auth');
    return;
  } catch (error) {
    navigate('/login', { replace: true });
    purgeStorage('user');
    purgeStorage('persist:auth');
    return;
  }
};

// Fonction de refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = TokenService.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Aucun refresh token disponible');
    }

    const response = await axios.post(`${BASEURL}/authentification/refresh`, {
      refreshToken: refreshToken
    });

    if (response.data.success) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      TokenService.setTokens(accessToken, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    }

    throw new Error('Échec du refresh token');
  } catch (error) {
    console.error('Erreur lors du refresh token:', error);
    TokenService.clearTokens();
    throw error;
  }
};

// Fonction pour vérifier l'état d'authentification
export const checkAuthStatus = () => {
  const accessToken = TokenService.getAccessToken();
  const user = TokenService.getUser();

  console.log('checkAuthStatus - accessToken:', accessToken ? 'exists' : 'null');
  console.log('checkAuthStatus - user:', user);

  if (!accessToken) {
    console.log('checkAuthStatus - No access token found');
    return { isAuthenticated: false, user: null };
  }

  if (TokenService.isTokenExpired(accessToken)) {
    console.log('checkAuthStatus - Token is expired, clearing tokens');
    TokenService.clearTokens();
    return { isAuthenticated: false, user: null };
  }

  console.log('checkAuthStatus - User is authenticated');
  return { isAuthenticated: true, user };
};
