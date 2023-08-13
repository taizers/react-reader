import axios from 'axios';
import { apiUrl } from '../../constants/constants';

export const checkAuth = () => {
  return axios.get<AuthenticatorResponse>(`${apiUrl}refresh-token`, {withCredentials: true});
};
