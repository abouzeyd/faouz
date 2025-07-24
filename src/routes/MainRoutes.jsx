import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectsRoutes from '../utils/ProtectsRoutes';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const Home = Loadable(lazy(() => import('../pages/home/index')));
const ListeUtilisateurs = Loadable(lazy(() => import('../pages/parametrage/liste-utilisateurs')));
const ListePisteAudit = Loadable(lazy(() => import('../pages/parametrage/piste-audit')));
const ListeProfilPrivilege = Loadable(lazy(() => import('../pages/parametrage/profil-privilege')));
const ListeEcole = Loadable(lazy(() => import('../pages/parametrage/liste-ecoles')));

// render - color

// render - sample page

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
      path: 'home',
      element: (
        <ProtectsRoutes>
          <Home />
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
    }
  ]
};
export default MainRoutes;
