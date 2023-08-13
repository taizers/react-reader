import axios from 'axios';
import { apiUrl } from '../../constants/constants';

axios.defaults.withCredentials = true;

export const checkAuth = () => {
  return axios.post<AuthenticatorResponse>(`${apiUrl}refresh-token`);
};
