import { NextFunction, Response } from 'express';
import bcrypt from 'bcrypt';
import { customResponse } from '../helpers/responce';
import { getUser, createUser } from '../services/db/users.services';
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

const getUserSession = async (userData: {id: string, role?: string}) => {
  const session = generateTokens(userData);

  await saveToken(userData?.id, session.refresh_token);

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

    if (user?.id) {
      throw new Error('Пользователь уже существует');
    }
  } catch(error) {
    logger.error('SignUp Action - User already exist', error);
    next(error);
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser({
      email,
      password: encryptedPassword,
      username,
    });

    return customResponse(res, 201, {...new UserDto(user)});
  } catch (error) {
    logger.error('SignUp Action - Cannot create user', error);
    next(error);
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
    const user = await getUser({ email });

    if (!user) {
      throw new ResourceNotFoundError('Пользователь');
    }

    const isPasswordsEqual = await bcrypt.compare(password, user?.password);

    if (!isPasswordsEqual) {
      throw new BadCredentialsError('Неправильный пароль');
    }

    const user_session = await getUserSession({id: user?.id, role: user?.role});

    const dtosUser = new UserDto(user);

    res.cookie('refresh_token', user_session?.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
    });

    return customResponse(res, 200, { user_session, user: dtosUser });
  } catch (error) {
    logger.error('Login Action - Cannot login user', error);
    next(error);
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
      tokenFromBd.user_id !== userFormToken.id
    ) {
      throw new ApplicationError('Неправильный refresh токен.', 401);
    }
    const user:any = getUser({ id: userFormToken.id });
  
    if (!user) {
      throw new UnAuthorizedError();
    }
  
    const user_session = await getUserSession({id: user?.id, role: user?.role});
  
    const dtosUser = new UserDto(user);


    res.cookie('refresh_token', user_session.refresh_token, {
      maxAge: Number(process.env.JWT_REFRESH_MAX_AGE) * 1000,
      httpOnly: true,
      secure: false,
    });

    return customResponse(res, 200, { user_session, user: dtosUser });
  } catch (error) {
    logger.error('Refresh Action - Cannot refresh', error);
    next(error);
  }
};

export const logoutAction = async (
  req: requestWithCookiesToken,
  res: Response,
  next: NextFunction
) => {
  const refresToken = req.cookies.refresh_token;

  logger.info(`Logout Action: { refresh_token: ${refresToken} }`);

  try {
    await removeToken(refresToken);

    return customResponse(res, 200, { success: true });
  } catch (error) {
    logger.error('Logout Action - Cannot logout', error);
    next(error);
  }
};
