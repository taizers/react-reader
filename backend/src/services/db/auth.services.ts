// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, Group } = require('../../db/models/index');

import {
  BadCredentialsError,
  ResourceNotFoundError,
} from '../../helpers/error';
import UserDto from '../../dtos/user.dto';
import {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  findToken,
} from '../../services/db/token.services';
import bcrypt from 'bcrypt';
import { UnAuthorizedError, ApplicationError } from '../../helpers/error';

const getUserSession = async (id: number, role: string) => {
  const session = generateTokens(id, role);

  await saveToken(id, session.refresh_token);

  return session;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Group,
        as: 'users',
      },
    ],
    row: true,
  });

  if (!user) {
    throw new ResourceNotFoundError('Пользователь');
  }

  const isPasswordsEqual = await bcrypt.compare(password, user.password);

  if (!isPasswordsEqual) {
    throw new BadCredentialsError('Неправильный пароль');
  }

  const user_session = await getUserSession(user.id, user.role);

  const dtosUser = new UserDto(user);

  return { user_session, user: dtosUser };
};


export const logout = async (refreshToken: string) => {
  await removeToken(refreshToken);
};

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApplicationError('Неправильный refresh токен.', 401);
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
  const user = await User.findOne({
    where: { id: userFormToken.id },
    include: [
      {
        model: Group,
        as: 'users',
      },
    ],
  });

  if (!user) {
    throw new UnAuthorizedError();
  }

  const user_session = await getUserSession(user.id, user.role);

  const dtosUser = new UserDto(user);

  return { user_session, user: dtosUser };
};
