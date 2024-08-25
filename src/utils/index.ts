const TOKEN_KEY = 'access_token';

const isToken = (tokenName: string = TOKEN_KEY) => {
  return !!localStorage.getItem(tokenName);
};

const setToken = (token: string, tokenName: string = TOKEN_KEY) => {
  localStorage.setItem(tokenName, token);
};

const getToken = (tokenName: string = TOKEN_KEY) => {
  return localStorage.getItem(tokenName);
};

const clearToken = (tokenName: string = TOKEN_KEY) => {
  return localStorage.removeItem(tokenName);
};

export { isToken, getToken, setToken, clearToken };

export const getUserFromToken = (token: string) => {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentDate = Date.parse(new Date().toString())/1000;

  //TODO change > to <
  if (currentDate < payload.exp) {
    return {
      name: payload.name,
      id: payload.id,
      role: payload.role,
    };
  } else {
    clearToken();
  }
};
