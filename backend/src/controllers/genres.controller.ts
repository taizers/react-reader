import { NextFunction, Response, Request } from 'express';
import { createGenre, deleteGenre, getGenresByQuery } from '../services/db/genres.services';
import logger from '../helpers/logger';
import { getWithQueryRequest } from '../types/requests/global.request.type';

export const createGenreAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = {...req?.body};

  logger.info(`Create Genre Action: { payload: ${JSON.stringify(payload)} }`);

  try {
    const genre = await createGenre(payload);
    
    res.status(200).json(genre);
  } catch (error) {
    logger.error('Create Tag Action - Cannot create Tag', error);
    next(error);
  }
};

export const getGenresByQueryAction = async (
  req: getWithQueryRequest,
  res: Response,
  next: NextFunction
) => {
  const { query } = req.query;

  logger.info(`Get Genres By Query Action: { query: ${query} }`);

  try {
    const genres = await getGenresByQuery(query);
    
    res.status(200).json(genres);
  } catch (error) {
    logger.error('Get Genres By Query Action - Cannot get genres by query', error);
    next(error);
  }
};

export const deleteGenreAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;

  logger.info(`Delete Genre Action: { id: ${id} }`);

  try {
    await deleteGenre(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Genre Action - Cannot delete genre', error);
    next(error);
  }
};
