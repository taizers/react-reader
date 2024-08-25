import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';

const RequireAuth: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user === null) {
    return null;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
