// assets
import {
  LoginOutlined,
  ProfileOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  BankOutlined,
  SolutionOutlined,
  ReadOutlined,
  UserOutlined,
  LockOutlined,
  FundOutlined,
  FileDoneOutlined
} from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined,
  SettingOutlined,
  FolderOpenOutlined,
  BankOutlined,
  SolutionOutlined,
  ReadOutlined,
  UserOutlined,
  LockOutlined,
  FundOutlined,
  FileDoneOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  // title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'management',
      title: 'Gestion Administrative',
      type: 'collapse',
      url: '/gestion-administrative',
      icon: icons.FolderOpenOutlined,
      target: true,
      children: [
        {
          id: 'login2',
          title: 'Personnel Administratif',
          type: 'item',
          url: '/personnel-administratif',
          icon: icons.BankOutlined
        },
        {
          id: 'login2',
          title: 'Personnel Enseignant',
          type: 'item',
          url: '/personnel-enseignant',
          icon: icons.SolutionOutlined
        },
        {
          id: 'login2',
          title: 'Elève Coranique',
          type: 'item',
          url: '/eleve-coranique',
          icon: icons.ReadOutlined
        }
      ]
    },
    {
      id: 'setting',
      title: 'Paramétrage',
      type: 'item',
      url: '/register',
      icon: icons.SettingOutlined,
      target: true,
      children: [
        {
          id: 'login2',
          title: 'Liste des utilisateurs',
          type: 'item',
          url: '/liste-utilisateurs',
          icon: icons.UserOutlined
        },
        {
          id: 'login2',
          title: "Piste d'audit",
          type: 'item',
          url: '/piste-audit',
          icon: icons.FundOutlined
        },
        {
          id: 'login2',
          title: 'Profiles et Privilèges',
          type: 'item',
          url: '/profil-privilege',
          icon: icons.LockOutlined
        },
        {
          id: 'login2',
          title: 'Liste des écoles',
          type: 'item',
          url: 'liste-ecole',
          icon: icons.ProfileOutlined
        }
      ]
    }
  ]
};

export default pages;
