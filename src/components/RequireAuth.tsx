import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { getToken } from '../utils';

const RequireAuth: FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const localToken = getToken();

  return token || localToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
