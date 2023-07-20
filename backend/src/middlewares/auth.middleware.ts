import { UnAuthorizederror } from '../helpers/error';
import { Response, NextFunction } from 'express';
import { validateAccessToken } from '../services/db/token.services';

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(new UnAuthorizederror());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(new UnAuthorizederror());
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      return next(new UnAuthorizederror());
    }

    req.user = { ...userData };
    next();
  } catch (error) {
    return next(new UnAuthorizederror());
  }
};

export default verifyToken;
