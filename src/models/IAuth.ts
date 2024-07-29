export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthDataResponce {
  id: string;
  email: string;
  name: string;
}

export interface ISignUpData extends Omit<IAuthDataResponce, 'id'> {
  password: string;
}