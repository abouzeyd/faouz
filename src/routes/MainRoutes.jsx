/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
// import DashboardLayout from 'layout/Dashboard';
const DashboardLayout = Loadable(lazy(() => import('layout/Dashboard')));
import ProtectsRoutes from '../utils/ProtectsRoutes';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/default')));
const ListeUtilisateurs = Loadable(lazy(() => import('../pages/parametrage/liste-utilisateurs')));
const ListePisteAudit = Loadable(lazy(() => import('../pages/parametrage/piste-audit')));
const ListeProfilPrivilege = Loadable(lazy(() => import('../pages/parametrage/profil-privilege')));
const ListeEcole = Loadable(lazy(() => import('../pages/parametrage/liste-ecoles')));
const ListeChambres = Loadable(lazy(() => import('../pages/parametrage/chambre')));
const ListeEleves = Loadable(lazy(() => import('../pages/parametrage/eleves')));

// render - color

// render - sample pages

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/dashboard',
      element: (
        <ProtectsRoutes>
          <DashboardDefault />
        </ProtectsRoutes>
      )
    },
    {
      path: 'liste-utilisateurs',
      element: (
        <ProtectsRoutes>
          <ListeUtilisateurs />
        </ProtectsRoutes>
      )
    },
    {
      path: 'piste-audit',
      element: (
        <ProtectsRoutes>
          <ListePisteAudit />
        </ProtectsRoutes>
      )
    },
    {
      path: 'profil-privilege',
      element: (
        <ProtectsRoutes>
          <ListeProfilPrivilege />
        </ProtectsRoutes>
      )
    },
    {
      path: 'liste-ecole',
      element: (
        <ProtectsRoutes>
          <ListeEcole />
        </ProtectsRoutes>
      )
    },
    {
      path: 'chambre',
      element: (
        <ProtectsRoutes>
          <ListeChambres />
        </ProtectsRoutes>
      )
    },
    {
      path: 'eleves',
      element: (
        <ProtectsRoutes>
          <ListeEleves />
        </ProtectsRoutes>
      )
    }
  ]
};
export default MainRoutes;
