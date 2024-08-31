import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction, getBooksTextAction, translateBookAction, getTranslateListAction } from '../controllers/localBooks.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation, translateBookValidation, getBookTextValidation } from '../validations/books.validation';
import { uploadBooksMiddleware } from '../middlewares/upload.middleware';

router.post('/', createBookValidation, uploadBooksMiddleware.single('book'),  createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.post('/translate/:id', translateBookValidation, translateBookAction);
router.get('/translate-list', getTranslateListAction);
router.get('/:id', paramsIdValidation, getBookAction);
router.get('/:id/text', getBookTextValidation, getBooksTextAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', paramsIdValidation, deleteBookAction);

export default router;
