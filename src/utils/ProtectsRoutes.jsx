/* eslint-disable prettier/prettier */
import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { checkAuthStatus } from '../service/auth';

const ProtectedRoutes = ({ children }) => {
  const { authentication } = useSelector((state) => state.auth);

  // Vérifier l'état d'authentification
  const authStatus = checkAuthStatus();

  // Si l'utilisateur n'est pas authentifié (ni dans Redux ni dans localStorage), rediriger vers login
  if (!authStatus.isAuthenticated && !authentication.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est authentifié dans Redux mais pas dans localStorage, synchroniser
  if (authentication.isAuthenticated && !authStatus.isAuthenticated) {
    // L'utilisateur est connecté dans Redux mais pas dans localStorage
    // On peut soit rediriger vers login, soit continuer
    // Pour l'instant, on continue
  }

  // Si l'utilisateur est authentifié, afficher le contenu protégé
  return children || <Outlet />;
};

export default ProtectedRoutes;
