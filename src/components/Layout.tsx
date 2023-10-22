import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { StyledApp } from '../styled';
import SideBar from './Sidebar/Sidebar';

const LayOut: FC = () => {
  return (
    <StyledApp>
      <SideBar child={<Outlet />} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledApp>
  );
};

export default LayOut;
