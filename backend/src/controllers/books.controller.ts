import { NextFunction, Response, Request } from 'express';
import { getBooks } from '../services/books.services';
import { getBooksRequest } from '../types/requests/books.request.type';

export const getBooksAction = async (
  req: getBooksRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {query, page, limit} = req.query;

    const books = await getBooks(query, +page, +limit);
    
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
}


  // async getBooksByAuthor(req, res, next) {
  //   try {
  //     const {id, page, limit} = req.query;

  //     const books = await booksService.getBooks(id, page, limit);
      
  //     res.status(200).json(books);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
