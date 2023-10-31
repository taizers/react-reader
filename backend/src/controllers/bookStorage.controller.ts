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

  const id = req.body.id;
  
  const links = req.files?.map((item: {destination: string; filename: string})=>{
    return `${item.destination}${item.filename}`;
  });

  logger.info(`Upload Book File Action: { book id: ${id}, links: ${JSON.stringify(links)} }`);

  try {
    Promise.all(
      links.map(async (item: string)=>{
        await createBookStorage({book_id: id, link: item});
      })
    )
    
    res.status(201).json('ok');
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

  logger.info(`Delete Book Action: { id: ${JSON.stringify(ids)} }`);

  try {
    await deleteBookStorage(ids);
    
    res.status(200).json('ok');
  } catch (error) {
    logger.error('Delete Book Action - Cannot delete book', error);
    next(error);
  }
};
