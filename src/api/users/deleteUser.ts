import http from '../../http';

export const deleteUser = (id: string) => {
  return http.delete<AuthenticatorResponse>(`users/${id}`);
}