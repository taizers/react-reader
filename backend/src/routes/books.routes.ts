import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction } from '../controllers/localBooks.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation } from '../validations/books.validation';
import { uploadCoversMiddleware } from '../middlewares/upload.middleware';

router.post('/',createBookValidation, uploadCoversMiddleware.single('cover'), createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.get('/:id', paramsIdValidation, getBookAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', paramsIdValidation, deleteBookAction);

export default router;
