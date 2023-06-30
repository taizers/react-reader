import http from '../../http';
import { UpdateUserType } from '../../constants/tsSchemes';

export const updateUser = (data: UpdateUserType) => {
  return http.put<AuthenticatorResponse>('users', data);
}