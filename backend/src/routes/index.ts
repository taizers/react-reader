import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
} from '../controllers/auth.controller';

import {
  signUpValidation,
  loginValidation,
  cookiesValidation,
} from '../validations/auth.validation';

import usersRouter from './users.routes';


import { uploadAvatarMiddleware } from '../middlewares/upload.middleware';
import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/sign-in', loginValidation, loginAction);
router.post('/refresh-token', cookiesValidation, refreshAction);
router.post('/logout', cookiesValidation, logoutAction);


router.use('/users', usersRouter);
// router.use('/books', booksRouter);

export default router;
