import http from '../../http';

type ValueType = {
  email: string;
  password: string;
  name: string;
};

export const signUp = (data: ValueType) => {
  return http.post<AuthenticatorResponse>('auth/signUp', data);
}
