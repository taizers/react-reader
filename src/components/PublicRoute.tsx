import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const PublicRoute: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user === null) {
    return null
  }

  return !user?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PublicRoute;
