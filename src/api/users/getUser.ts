import http from '../../http';

export const getUser = (id: string) => {
  return http.get<AuthenticatorResponse>(`users/${id}`);
}