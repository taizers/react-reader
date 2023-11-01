import { NextFunction, Response, Request } from 'express';
import { createBookStorage, deleteBookStorage } from '../services/db/bookStorage.services';
import logger from '../helpers/logger';
import { UnProcessableEntityError } from '../helpers/error';

export const uploadBookFilesAction = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.files.length) {
    return next(new UnProcessableEntityError('Files Not Found'));
  }
  const bookId = req.params?.bookId;
  const userId = req.user?.id;

  logger.info(`Upload Book File Action: { book id: ${bookId}, user id: ${userId}, links: ${JSON.stringify(req.files)} }`);

  try {
    await createBookStorage({book_id: bookId, user_id: userId, files: req.files});
    
    res.status(201).json('created');
  } catch (error) {
    logger.error('Upload Book File Action - Cannot upload book file', error);
    next(error);
  }
};

export const deleteBookStoragesAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ids = req.body.ids;

  logger.info(`Delete Book Storages Action: { id: ${JSON.stringify(ids)} }`);

  try {
    await deleteBookStorage(ids);
    
    res.status(200).json('ok');
  } catch (error) {
    logger.error('Delete Book Storages Action - Cannot delete book storages', error);
    next(error);
  }
};
