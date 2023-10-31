import { NextFunction, Response, Request } from 'express';
import { getAllBooks, getBook, updateBook, deleteBook, createBook, getPaginatedBooks } from '../services/db/books.services';
import logger from '../helpers/logger';
import { UnProcessableEntityError } from '../helpers/error';

export const getAllBooksAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info('Get All Books Action');

  try {
    const books = await getAllBooks();
    
    res.status(200).json(books);
  } catch (error) {
    logger.error('Get All Books Action - Cannot get books', error);
    next(error);
  }
};

export const getPaginatedBooksAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;

  logger.info(`Get Paginated Books Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const books = await getPaginatedBooks(+page-1, +limit, query.toString());
    
    res.status(200).json(books);
  } catch (error) {
    logger.error('Get Paginated Books Action - Cannot get books', error);
    next(error);
  }
};

export const createBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const cover = `${req.file?.destination}${req.file?.filename}`;
    const body = req.body;
    // console.log(req)
    const payload = {...body, cover};
  
    logger.info(`Create Book Action: { payload: ${JSON.stringify(payload)} }`);
    const book = await createBook(payload);
    
    res.status(200).json(book);
  } catch (error) {
    logger.error('Create Book Action - Cannot create book', error);
    next(error);
  }
};

export const uploadBookFileAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new UnProcessableEntityError('File Not Found'));
  }
  const books = req.files;
  console.log(req.files);
  const payload = req.body;

  logger.info(`Upload Book File Action: { payload: ${payload} }`);

  try {
    // const book = await createBook(payload);
    
    res.status(200).json('ok');
  } catch (error) {
    logger.error('Upload Book File Action - Cannot upload book file', error);
    next(error);
  }
};

export const getBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get Book Action: { id: ${id} }`);

  try {
    const book = await getBook({id});
    
    res.status(200).json(book);
  } catch (error) {
    logger.error('Get Book Action - Cannot get book', error);
    next(error);
  }
};

export const updateBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;

  logger.info(`Update Book Action: { id: ${id}, payload: ${payload} }`);

  try {
    const book = await updateBook({ id }, payload);
    
    res.status(200).json(book);
  } catch (error) {
    logger.error('Update Book Action - Cannot update book', error);
    next(error);
  }
};

export const deleteBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Delete Book Action: { id: ${id} }`);

  try {
    await deleteBook(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Book Action - Cannot delete book', error);
    next(error);
  }
};
