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
import { getValueLocalStorage } from '../service/globalFunction';

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const dataChild = getValueLocalStorage('generateMenu') || [];

const pages = {
  id: 'authentication',
  type: 'group',
  children: dataChild[0]?.sousmenu?.map((parent) => ({
    id: parent?.id,
    title: parent?.strName,
    type: parent?.sousmenu?.length ? 'collapse' : 'item',
    url: `/${parent?.strUrl?.toLowerCase()}`,
    icon: () => <span dangerouslySetInnerHTML={{ __html: parent.strClass }} />,
    target: true,
    children: parent?.sousmenu?.map((child) => ({
      id: child?.id,
      title: child?.strName,
      type: 'item',
      url: `/${child?.strUrl?.toLowerCase()}`,
      icon: () => <span dangerouslySetInnerHTML={{ __html: child.strClass }} />
    }))
  }))
};

export default pages;
