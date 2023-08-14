import http from '../../http';

export const getAllUsers = (payload: { page: number, limit : number }) => {
  return http.get<any>(`users?page=${payload.page}&limit=${payload.limit || null}`);
}
