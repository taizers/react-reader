import http from '../../http';

export const getAllUsers = () => {
  return http.get<AuthenticatorResponse>('users');
}
