import { NextFunction, Response, Request } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../services/db/users.services';
import logger from '../helpers/logger';

export const getAllUsersAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit } = req.query;

  logger.info(`Get Paginated Users Action: { page: ${page}, limit: ${limit} }`);
  try {
    const users = await getAllUsers(+page - 1, +limit);
    
    res.status(200).json(users);
  } catch (error) {
    logger.error('Get All Users Action - Cannot get users', error);
    next(error);
  }
}

export const getUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get User Action: { id: ${id} }`);

  try {

    const user = await getUser({id});
    
    res.status(200).json(user);
  } catch (error) {
    logger.error('Get User Action - Cannot get user', error);
    next(error);
  }
}

export const updateUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, name, newPassword, oldPassword } = req.body;

  logger.info(`Update User Action: { id: ${id}, name: ${name}, newPassword: ${newPassword}, oldPassword: ${oldPassword} }`);

  try {
    const user = await updateUser(id, {
      name,
      newPassword,
      oldPassword,
    });
    
    res.status(200).json(user);
  } catch (error) {
    logger.error('Update User Action - Cannot update user', error);
    next(error);
  }
}

export const deleteUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  logger.info(`Get User Action: { id: ${id} }`);

  try {
    await deleteUser(id);
    
    res.status(200).json(id);
  } catch (error) {
    logger.error('Delete User Action - Cannot delete user', error);
    next(error);
  }
}
