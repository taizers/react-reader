import { NextFunction, Response, Request } from 'express';
import { getBooks } from '../services/flibustaBooks.services';
import { getBooksRequest } from '../types/requests/books.request.type';
import logger from '../helpers/logger';

export const getBooksAction = async (
  req: getBooksRequest,
  res: Response,
  next: NextFunction
) => {
  const {query, page, limit} = req.query;
    
  logger.info(`Get Books Action: { query: ${query}, page: ${page}, limit: ${limit} }`);

  try {
    const books = await getBooks(query, +page, +limit);
    
    res.status(200).json(books);
  } catch (error) {
    logger.error('Get Books Action - Cannot get books', error);
    next(error);
  }
}
