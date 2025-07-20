/* eslint-disable prettier/prettier */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/auth/auth';
import { deconnexion } from '../service/auth';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Appel API de déconnexion
      await deconnexion();

      // Mettre à jour le state Redux
      dispatch(logout());

      // Rediriger vers la page de login
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      // Même en cas d'erreur, nettoyer le state local
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
      Déconnexion
    </Button>
  );
};

export default LogoutButton;
