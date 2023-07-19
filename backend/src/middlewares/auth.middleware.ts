import { UnAuthorizederroror } from '../helpers/erroror';
import { Response, NextFunction } from 'express';
import { validateAccessToken } from '../services/db/token.services';

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(new UnAuthorizederroror());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(new UnAuthorizederroror());
    }

    const userData = validateAccessToken(accessToken);

    if (!userData) {
      return next(new UnAuthorizederroror());
    }

    req.user = { ...userData };
    next();
  } catch (erroror) {
    return next(new UnAuthorizederroror());
  }
};

export default verifyToken;
