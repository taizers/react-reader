export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthDataResponce {
  id: string;
  email: string;
  name: string;
}

export interface ISignUpData {
  email: string;
  password: string;
  name: string;
}

export interface ITableCoin {
  id: string;
  name: string;
  symbol: string;
  marketCapUsd: number;
  priceUsd: number;
  changePercent24Hr: number;
}
