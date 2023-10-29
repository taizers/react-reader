import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookIcon from '@mui/icons-material/Book';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { Sidebar } from '../constants/enums';

export const menuItems = [
  {
    title: Sidebar.Main,
    path: '/',
    icon: GroupIcon,
    access: 'all',
  },
  {
    title: Sidebar.Users,
    path: '/users',
    icon: GroupIcon,
    access: 'private',
  },
  {
    title: Sidebar.LocalBooks,
    path: '/local-books',
    icon: BookmarkBorderIcon,
    access: 'private',
  },
  {
    title: Sidebar.Books,
    path: '/books',
    icon: MenuBookIcon,
    access: 'private',
  },
];

export const subMenuItems = [
  {
    title: Sidebar.Library,
    path: '/library',
    icon: BookIcon,
    access: 'private',
  },
  {
    title: Sidebar.Login,
    path: '/login',
    icon: LoginIcon,
    access: 'public',
  },
  {
    title: Sidebar.Profile,
    path: '/profile',
    icon: AccountCircleIcon,
    access: 'private',
  },
  {
    title: Sidebar.Logout,
    path: '/',
    icon: LogoutIcon,
    access: 'private',
  },
];
