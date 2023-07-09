import { Request } from 'express';

export interface getBooksRequest extends Request {
  query: {
    query: string;
    page?: string;
    limit?: string;
  };
}
