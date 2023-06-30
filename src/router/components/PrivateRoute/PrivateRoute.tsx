import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { AppContainer, MainContent } from '../styled';
import Sidebar from '../../../components/Sidebar/index';
import { getToken } from '../../../utils/index';

type PrivateRouteType = {
  component: React.ReactNode;
  isAuth: boolean;
};

export const PrivateRoute: FC<PrivateRouteType> = ({ component, isAuth }) => {
  const token = getToken();

  return (
    <AppContainer>
      <Sidebar>
        <MainContent>{(isAuth || token) ? component : <Navigate to={'/login'} />}</MainContent>
      </Sidebar>
    </AppContainer>
  );
};
