import { NextFunction, Response, Request } from 'express';
import { getPaginatedSeries, createSeria, deleteSeria, getSeria, updateSeria } from '../services/db/series.services';
import logger from '../helpers/logger';

export const getPaginatedSeriesAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, query } = req.query;

  logger.info(`Get Paginated Series Action: { page: ${page}, limit: ${limit}, query: ${query} }`);

  try {
    const series = await getPaginatedSeries(+page-1, +limit, query.toString());
    
    res.status(200).json(series);
  } catch (error) {
    logger.error('Get Paginated Series Action - Cannot get series', error);
    next(error);
  }
};

export const createSeriaAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = req.body;

  logger.info(`Create Seria Action: { payload: ${payload} }`);

  try {
    const seria = await createSeria(payload);
    
    res.status(200).json(seria);
  } catch (error) {
    logger.error('Create Seria Action - Cannot create seria', error);
    next(error);
  }
};

export const getSeriaAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get Seria Action: { id: ${id} }`);

  try {
    const seria = await getSeria({id});
    
    res.status(200).json(seria);
  } catch (error) {
    logger.error('Get Seria Action - Cannot get seria', error);
    next(error);
  }
};

export const updateSeriaAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const payload = req.body;

  logger.info(`Update Seria Action: { id: ${id}, payload: ${payload} }`);

  try {
    const seria = await updateSeria({ id }, payload);
    
    res.status(200).json(seria);
  } catch (error) {
    logger.error('Update Seria Action - Cannot update seria', error);
    next(error);
  }
};

export const deleteSeriaAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Delete Seria Action: { id: ${id} }`);

  try {
    await deleteSeria(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Seria Action - Cannot delete seria', error);
    next(error);
  }
};
