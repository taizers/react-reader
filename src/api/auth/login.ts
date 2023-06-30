import http from '../../http';

type ValueType = {
    email: string;
    password: string;
};

export const login = (data: ValueType) => {
  return http.post<AuthenticatorResponse>('auth/login', data);
}
