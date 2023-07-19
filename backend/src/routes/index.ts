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

import { getBooksAction } from '../controllers/books.controller';

import usersRouter from './users.routes';
import booksRouter from './books.routes';

import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/sign-in', loginValidation, loginAction);
router.post('/refresh-token', cookiesValidation, refreshAction);
router.post('/logout', cookiesValidation, logoutAction);

router.get('/search', getBooksAction);

//Routes

router.use('/users', verifyToken, usersRouter);
router.use('/books', verifyToken, booksRouter);

export default router;
