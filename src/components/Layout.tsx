import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { StyledApp } from '../styled';
import SideBar from './Sidebar/Sidebar';
import { authApiSlice } from '../store/reducers/AuthApiSlice';

const LayOut: FC = () => {
  const { data, error, isLoading } = authApiSlice.useProfileQuery('');

  return (
    <StyledApp>
      {!isLoading && <SideBar child={<Outlet />} />}
      <Toaster position="bottom-right" reverseOrder={false} />
    </StyledApp>
  );
};

export default LayOut;
