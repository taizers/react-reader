import React, { FC, useState, ReactNode } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { menuItems, subMenuItems } from '../../router';
import { Sidebar as SidebarEnum } from '../../constants/enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { localLogout } from '../../store/reducers/AuthSlice';
import { clearToken } from '../../utils';
import { authApiSlice } from '../../store/reducers/AuthApiSlice';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

type SideBartype = {
  child: ReactNode;
};

const SideBar: FC<SideBartype> = ({ child }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const [logout, { data, isLoading, error }] = authApiSlice.useLogoutMutation();

  let history = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const localLogoutAction = () => {
    dispatch(localLogout());
    clearToken();
    logout('');
  };

  const getAccess = (item: { access: string }) => {
    if (item.access === 'private' && token) {
      return true;
    }
    if (item.access === 'public' && !token) {
      return true;
    }
    if (item.access === 'all') {
      return true;
    }

    return false;
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Меню
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map(
            (item) =>
              getAccess(item) && (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      history(item.path);
                    }}
                  >
                    <ListItemIcon>{<item.icon />}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
        <Divider />
        <List>
          {subMenuItems.map(
            (item) =>
              getAccess(item) && (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      item.title === SidebarEnum.Logout
                        ? localLogoutAction()
                        : history(item.path);
                    }}
                  >
                    <ListItemIcon>{<item.icon />}</ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              )
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {child}
      </Main>
    </Box>
  );
};

export default SideBar;
