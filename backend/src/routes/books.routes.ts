import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction } from '../controllers/localBooks.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation } from '../validations/books.validation';

router.post('/', createBookValidation, createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.get('/:id', paramsIdValidation, getBookAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', paramsIdValidation, deleteBookAction);

export default router;
