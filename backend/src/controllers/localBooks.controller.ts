import { NextFunction, Response, Request } from 'express';
import { getAllBooks, getBook, updateBook, deleteBook, createBook, getPaginatedBooks } from '../services/db/books.services';
import logger from '../helpers/logger';
import { UnProcessableEntityError } from '../helpers/error';
import { readFileSync } from 'fs';
import iconv from 'iconv-lite';

const getEncodingCode = (file: Buffer) => {
  const stringedFile = file.toString('utf8', 0, 100);

  const fileEncoding = stringedFile.slice(stringedFile.indexOf('encoding'), stringedFile.indexOf('?>'));

  const code = fileEncoding.split('"')[1];
  const encodingArray = {
    "windows-1251": "win1251",
  } as any;

  return encodingArray[code];
}

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
    const books = await getPaginatedBooks(+page-1, +limit, query?.toString());
    
    res.status(200).json(books);
  } catch (error) {
    logger.error('Get Paginated Books Action - Cannot get books', error);
    next(error);
  }
};

export const createBookAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // if (!req.file) {
  //   return next(new UnProcessableEntityError('File Not Found'));
  // }

  const user_id = req.user?.id;
  const cover = `${req.file?.destination}${req.file?.filename}`;
  const payload = {...req?.body, cover: req.file ? cover : null, user_id};

  logger.info(`Create Book Action: { payload: ${JSON.stringify(payload)} }`);

  try {
    const book = await createBook(payload);
    
    res.status(200).json(book);
  } catch (error) {
    logger.error('Create Book Action - Cannot create book', error);
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

    const text: any = {}; 

    if (book?.primory_link) {
      const file = readFileSync(book.primory_link);

      const code = getEncodingCode(file);

      const result = iconv.encode(iconv.decode (file, code), 'utf8').toString();
  
      const annotation = result.slice(result.indexOf('<annotation>'), result.indexOf('</annotation>'));
      text.annotation = annotation;
      text.result = result;
    }

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
