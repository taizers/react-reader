import express from 'express';

import {
  signUpAction,
  loginAction,
  refreshAction,
  logoutAction,
  getProfileAction,
} from '../controllers/auth.controller';

import {
  signUpValidation,
  loginValidation,
  cookiesValidation,
} from '../validations/auth.validation';

import { getBooksAction } from '../controllers/flibustaBooks.controller';

import usersRouter from './users.routes';
import booksRouter from './books.routes';
import seriesRouter from './series.routes';
import libraryRouter from './library.routes';
import tagsRouter from './tags.routes';
import genresRouter from './genres.routes';

import verifyToken from '../middlewares/auth.middleware';

const router = express.Router();

router.use(
  '/storage/covers',
  verifyToken,
  express.static('storage/covers')
);
router.use(
  '/storage/books',
  express.static('storage/books')
);

// Authorization

router.post('/sign-up', signUpValidation, signUpAction);
router.post('/login', loginValidation, loginAction);
router.get('/refresh', cookiesValidation, refreshAction);
router.post('/logout', cookiesValidation, logoutAction);
router.get('/profile', verifyToken, getProfileAction);

router.get('/search', getBooksAction);

//Routes

router.use('/users', verifyToken, usersRouter);
router.use('/books', verifyToken, booksRouter);
router.use('/series', verifyToken, seriesRouter);
router.use('/library', verifyToken, libraryRouter);
router.use('/tags', verifyToken, tagsRouter);
router.use('/genres', verifyToken, genresRouter);

export default router;
