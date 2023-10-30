import { NextFunction, Response, Request } from 'express';
import { createLibrary, deleteLibraryBook, getLibraryBook, getPaginatedLibrary, updateLibraryBook } from '../services/db/library.services';
import logger from '../helpers/logger';

export const getPaginatedLibraryAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;
  const { id } = req.params;

  logger.info(`Get Paginated Library Action: { page: ${page}, limit: ${limit}, user id: ${id} }`);

  try {
    const library = await getPaginatedLibrary(+page-1, +limit, +id);
    
    res.status(200).json(library);
  } catch (error) {
    logger.error('Get Paginated Library Action - Cannot get library', error);
    next(error);
  }
};

export const createLibraryAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;

  logger.info(`Create Library Action: { payload: ${payload} }`);

  try {
    const library = await createLibrary(payload);
    
    res.status(200).json(library);
  } catch (error) {
    logger.error('Create Library Action - Cannot create library', error);
    next(error);
  }
};

export const getLibraryBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get Library Book Action: { id: ${id} }`);

  try {
    const libraryBook = await getLibraryBook({id});
    
    res.status(200).json(libraryBook);
  } catch (error) {
    logger.error('Get Library Book Action - Cannot get library book', error);
    next(error);
  }
};

export const updateLibraryBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;

  logger.info(`Update Library Book Action: { id: ${id}, payload: ${payload} }`);

  try {
    const libraryBook = await updateLibraryBook({ id }, payload);
    
    res.status(200).json(libraryBook);
  } catch (error) {
    logger.error('Update Library Book Action - Cannot update library book', error);
    next(error);
  }
};

export const deleteLibraryBookAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Delete Library Book Action: { id: ${id} }`);

  try {
    await deleteLibraryBook(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Library Book Action - Cannot delete library book', error);
    next(error);
  }
};
