import { Request } from 'express';

export interface signUpRequest extends Request {
  body: {
    activationkey: string;
    email: string;
    password: string;
    username: string;
  };
}

export interface loginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface requestWithCookiesToken extends Request {
  cookies: {
    refresh_token: string;
  };
}
