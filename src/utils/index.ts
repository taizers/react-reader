const TOKEN_KEY = 'accessToken';

const isToken = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const clearToken = () => {
  return localStorage.removeItem(TOKEN_KEY);
};

export { isToken, getToken, setToken, clearToken };
