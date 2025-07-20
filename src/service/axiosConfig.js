/* eslint-disable prettier/prettier */
import axios from 'axios';
import TokenService from './tokenService';
import { refreshAccessToken } from './auth';

// Créer une instance Axios avec configuration de base
const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter automatiquement le token aux requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et le refresh token
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 (non autorisé) et qu'on n'a pas déjà tenté un refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Tenter de rafraîchir le token
        const tokens = await refreshAccessToken();

        // Mettre à jour le header avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

        // Relancer la requête originale
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue, rediriger vers la page de login
        TokenService.clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
