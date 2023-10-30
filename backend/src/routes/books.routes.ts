import express from 'express';

const router = express.Router();
import { paramsIdValidation } from '../validations/global.validation';
import { getBookAction, getPaginatedBooksAction, updateBookAction, deleteBookAction, createBookAction, uploadBookFileAction } from '../controllers/localBooks.controller';
import { getPaginatedBooksValidation, updateBookValidation, createBookValidation } from '../validations/books.validation';
import { uploadFilesMiddleware } from '../middlewares/upload.middleware';

router.post('/', createBookValidation, createBookAction);
router.get('/', getPaginatedBooksValidation, getPaginatedBooksAction);
router.get('/:id', paramsIdValidation, getBookAction);
router.post('/:id/upload', paramsIdValidation, uploadFilesMiddleware.array('book', 5), uploadBookFileAction);
router.put('/:id', updateBookValidation, updateBookAction);
router.delete('/:id', paramsIdValidation, deleteBookAction);

export default router;
