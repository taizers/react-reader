import React, { FC } from 'react';

import { AppContainer, MainContent } from '../styled';
import Sidebar from '../../../components/Sidebar/index';

type PublicRouteWithSideBarType = {
  component: React.ReactNode;
};

export const PublicRouteWithSideBar: FC<PublicRouteWithSideBarType> = ({ component }) => {
  return (
    <AppContainer>
      <Sidebar>
        <MainContent>{component}</MainContent>
      </Sidebar>
    </AppContainer>
  );
};
