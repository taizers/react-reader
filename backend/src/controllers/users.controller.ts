import { NextFunction, Response, Request } from 'express';
import { getAllUsers, getUser, updateUser, deleteUser } from '../services/db/users.services';

export const getAllUsersAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

export const getUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await getUser({id});
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const updateUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, name, newPassword, oldPassword } = req.body;

    const user = await updateUser(id, {
      name,
      newPassword,
      oldPassword,
    });
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export const deleteUserAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    const user = await deleteUser(id);
    
    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
}
