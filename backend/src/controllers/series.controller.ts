import { NextFunction, Response, Request } from 'express';
import { getPaginatedSeries, createSeria, deleteSeria, getSeria, updateSeria, getSeriesList, getSeriaFields, getSeriaWithBookIds } from '../services/db/series.services';
import logger from '../helpers/logger';
import { DontHaveAccessError } from '../helpers/error';
import { IRequestWithUser } from '../types/requests/global.request.type';

export const getPaginatedSeriesAction = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;
  const user_id = req.user?.id;

  logger.info(`Get Paginated Series Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const series = await getPaginatedSeries(+page, +limit, query.toString(), user_id);
    
    res.status(200).json(series);
  } catch (error) {
    logger.error('Get Paginated Series Action - Cannot get series', error);
    next(error);
  }
};

export const getSeriesListAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req.query;

  logger.info(`Get Series List Action: { query: ${query} }`);

  try {
    const series = await getSeriesList(query.toString());
    
    res.status(200).json(series);
  } catch (error) {
    logger.error('Get Series List Action - Cannot get series list', error);
    next(error);
  }
};

export const createSeriaAction = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const cover = req.file ? `${req.file?.destination}${req.file?.filename}` : null;
    const user_id = req.user?.id;


    const payload = {...req?.body, cover, user_id};
  
    logger.info(`Create Seria Action: { payload: ${payload} }`);

    const {genres, tags, ...data} = payload;


    const seria = await createSeria(data, genres?.split(';'), tags?.split(';'));
    
    res.status(200).json(seria);
  } catch (error) {
    logger.error('Create Seria Action - Cannot create seria', error);
    next(error);
  }
};

export const getSeriaAction = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const user_id = req.user?.id;

  logger.info(`Get Seria Action: { id: ${id}, user_id ${user_id} }`);

  try {
    const seria = await getSeria({id}, user_id);
    
    res.status(200).json(seria);
  } catch (error) {
    logger.error('Get Seria Action - Cannot get seria', error);
    next(error);
  }
};

export const updateSeriaAction = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;
  const user_id = req.user?.id;

  logger.info(`Update Seria Action: { id: ${id}, payload: ${payload} }`);

  try {
    const {genres, tags, ...data} = payload;

    const prevSeria = await getSeriaFields({ id }, ['user_id']);

    if (prevSeria.user_id === user_id) {
      const seria = await updateSeria({ id }, data, genres?.split(';'), tags?.split(';'));
      
      res.status(200).json(seria);
    } else {
      throw new DontHaveAccessError();
    }
  } catch (error) {
    logger.error('Update Seria Action - Cannot update seria', error);
    next(error);
  }
};

export const deleteSeriaAction = async (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const user_id = req.user?.id;

  logger.info(`Delete Seria Action: { id: ${id} }`);

  try {
    const seria = await getSeriaWithBookIds({ id });

    if (seria.user_id === user_id) {
      await deleteSeria(id, seria.seriabooks);

      res.status(200).json(id);
    } else {
      throw new DontHaveAccessError();
    }
  } catch (error) {
    logger.error('Delete Seria Action - Cannot delete seria', error);
    next(error);
  }
};
