import { Request } from 'express';

export interface signUpRequest extends Request {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

export interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface IRequestWithCookiesToken extends Request {
  cookies: {
    refresh_token: string;
  };
}
