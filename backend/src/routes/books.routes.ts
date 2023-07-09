import express from 'express';

const router = express.Router();

import { getBooksAction } from '../controllers/books.controller';

router.get('/search', getBooksAction);
// router.get('/author', authMiddleware, booksController.getBooksByAuthor);

export default router;
