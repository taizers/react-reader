import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

type PublicRouteType = {
  component: React.ReactNode;
  isAuth: boolean;
};

export const PublicRoute: FC<PublicRouteType> = ({ component, isAuth }) => {
  return <>{!isAuth ? component : <Navigate to={'/'} />}</>;
};
