import http from '../../http';

export const getAllUsers = () => {
  return http.get<any>('users');
}
