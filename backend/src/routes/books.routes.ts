import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction, getBooksTextAction } from '../controllers/localBooks.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation } from '../validations/books.validation';
import { uploadBooksMiddleware } from '../middlewares/upload.middleware';

router.post('/', createBookValidation, uploadBooksMiddleware.single('book'),  createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.get('/:id', paramsIdValidation, getBookAction);
router.get('/:id/text', paramsIdValidation, getBooksTextAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', paramsIdValidation, deleteBookAction);

export default router;
