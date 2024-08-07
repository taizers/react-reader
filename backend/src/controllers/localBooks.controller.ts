import { NextFunction, Response, Request } from 'express';
import { getAllBooks, getBook, updateBook, deleteBook, createBook, getPaginatedBooks } from '../services/db/books.services';
import logger from '../helpers/logger';
import { UnProcessableEntityError } from '../helpers/error';
import { CreateBookRequest } from '../types/requests/books.request.type';
import { getJsonBook } from '../utils/booktojson';

export const createBookAction = async (
  req: CreateBookRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) {
    return next(new UnProcessableEntityError('File Not Found'));
  }

  const user_id = req.user?.id;
  // const cover = `${req.file?.destination}${req.file?.filename}`; // обложка cover: req.file ? cover : null, 
  const payload = {...req?.body, user_id, link: `${req.file?.destination}${req.file?.filename}`};

  logger.info(`Create Book Action: { payload: ${JSON.stringify(payload)} }`);

  try {
    const {genres, tags, ...data} = payload;

    const book = await createBook(data, genres.split(';'), tags.split(';'));
    
    res.status(200).json(book);
  } catch (error) {
    logger.error('Create Book Action - Cannot create book', error);
    next(error);
  }
};

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
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;
  const user_id = req.user?.id;

  logger.info(`Get Paginated Books Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const books = await getPaginatedBooks(+page, +limit, user_id.toString(), query?.toString());
    
    res.status(200).json(books);
  } catch (error) {
    logger.error('Get Paginated Books Action - Cannot get books', error);
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
    const text = await getJsonBook(book.link);

    // const translatedChapter = await getTranslatedChapter(text.content[4])

    res.status(200).json({book, text});
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

  logger.info(`Update Book Action: { id: ${id}, payload: ${JSON.stringify(payload)} }`);

  try {
    const {genres, tags, ...data} = payload;

    const book = await updateBook({ id }, data, genres.split(';'), tags.split(';'));
    
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
    // добавить проверку на пользователя
    await deleteBook(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Book Action - Cannot delete book', error);
    next(error);
  }
};
