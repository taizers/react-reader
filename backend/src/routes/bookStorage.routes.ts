import express from 'express';

const router = express.Router();
import { uploadBookFilesAction, deleteBookStoragesAction } from '../controllers/bookStorage.controller';
import { uploadFilesMiddleware } from '../middlewares/upload.middleware';
import { deleteBookStorageValidation } from '../validations/bookStorage.validation';

router.post('/:bookId', uploadFilesMiddleware.array('books', 5), uploadBookFilesAction);
router.delete('/', deleteBookStorageValidation, deleteBookStoragesAction);

export default router;
