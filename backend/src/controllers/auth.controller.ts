import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import { customResponse } from '../helpers/responce';
import { getUser, updateUser, createUser } from '../services/db/users.services';
import {
  signUpRequest,
  loginRequest,
  requestWithCookiesToken,
} from '../types/requests/auth.request.type';
import { UserSessionType } from '../types/entities/global.entities.type';
import logger from '../helpers/logger';
import { ResourceNotFoundError, BadCredentialsError, ApplicationError, UnAuthorizedError } from '../helpers/error';
import UserDto from '../dtos/user.dto';
import { generateTokens, saveToken, validateRefreshToken, findToken, removeToken } from '../services/db/token.services';

const getUserSession = async (id: number, role: string) => {
  const session = generateTokens(id, role);

  await saveToken(id, session.refresh_token);

  return session;
};

export const signUpAction = async (
  req: signUpRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password, username } = req.body;

  logger.info(
    `SignUp Action: { password: ${password}, email: ${email}, username: ${username} }`
  );

  try {
    const user = await getUser({ email });

    if (user) {
      throw new Error('Пользователь уже существует');
    }
  } catch(err) {
    logger.error('SignUp Action - User already exist', err);
    next(err);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser({
      email,
      password: encryptedPassword,
      username,
    });

    return customResponse(res, 201, new UserDto(user));
  } catch (err) {
    logger.error('SignUp Action - Cannot create user', err);
    next(err);
  }
};

export const loginAction = async (
  req: loginRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  logger.info(`Login Action: { email: ${email}, password: ${password} }`);

  try {
    const user:any = getUser({ email });

    if (!user) {
      throw new ResourceNotFoundError('Пользователь');
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      throw new BadCredentialsError('Неправильный пароль');
    }

    const user_session = await getUserSession(user.id, user.role);

    const dtosUser = new UserDto(user);

    res.cookie('refresh_token', user_session.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return customResponse(res, 200, { user_session, user: dtosUser });
  } catch (err) {
    logger.error('Login Action - Cannot login user', err);
    next(err);
  }
};

export const refreshAction = async (
  req: requestWithCookiesToken,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refresh_token;

  logger.info(`Refresh Action: { refresh_token: ${refreshToken} }`);

  try {
    if (!refreshToken) {
      throw new ApplicationError('Неверный refresh токен.', 401);
    }
  
    const userFormToken = validateRefreshToken(refreshToken);
    const tokenFromBd = await findToken(refreshToken);

    if (
      !userFormToken ||
      !tokenFromBd ||
      tokenFromBd.owner_id !== userFormToken.id
    ) {
      throw new ApplicationError('Неправильный refresh токен.', 401);
    }
    const user:any = getUser({ id: userFormToken.id });
  
    if (!user) {
      throw new UnAuthorizedError();
    }
  
    const user_session = await getUserSession(user.id, user.role);
  
    const dtosUser = new UserDto(user);


    res.cookie('refresh_token', user_session.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: false,
    });

    return customResponse(res, 200, { user_session, user: dtosUser });
  } catch (err) {
    logger.error('Refresh Action - Cannot refresh', err);
    next(err);
  }
};

export const logoutAction = async (
  req: requestWithCookiesToken,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refresh_token;

  logger.info(`Logout Action: { refresh_token: ${refreshToken} }`);

  try {
    await removeToken(refreshToken);

    return customResponse(res, 200, { success: true });
  } catch (err) {
    logger.error('Logout Action - Cannot logout', err);
    next(err);
  }
};
