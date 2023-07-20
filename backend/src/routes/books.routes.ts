import express from 'express';

const router = express.Router();

import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction } from '../controllers/localBooks.controller';
import { getBookValidation, getPaginatedBooksValidation, updateBookValidation, createBookValidation, deleteBookValidation } from '../validations/books.validation';

router.post('/', createBookValidation, createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.get('/:id', getBookValidation, getBookAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', deleteBookValidation, deleteBookAction);

export default router;
