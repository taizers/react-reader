import { NextFunction, Response, Request } from 'express';
import { createTag, deleteTag, getTagsByQuery } from '../services/db/tags.services';
import logger from '../helpers/logger';
import { getWithQueryRequest } from '../types/requests/global.request.type';

export const createTagAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = {...req?.body};

  logger.info(`Create Tag Action: { payload: ${JSON.stringify(payload)} }`);

  try {
    const tag = await createTag(payload);
    
    res.status(200).json(tag);
  } catch (error) {
    logger.error('Create Tag Action - Cannot create tag', error);
    next(error);
  }
};

export const getTagsByQueryAction = async (
  req: getWithQueryRequest,
  res: Response,
  next: NextFunction
) => {
  const { query } = req.query;

  logger.info(`Get Tags By Query Action: { query: ${query} }`);

  try {
    const tags = await getTagsByQuery(query);
    
    res.status(200).json(tags);
  } catch (error) {
    logger.error('Get Tags By Query Action - Cannot get tags by query', error);
    next(error);
  }
};

export const deleteTagAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params?.id;

  logger.info(`Delete Tag Action: { id: ${id} }`);

  try {
    await deleteTag(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete Tag Action - Cannot delete tag', error);
    next(error);
  }
};
