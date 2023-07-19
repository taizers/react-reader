import express from 'express';

const router = express.Router();

import { getBookAction, getAllBooksAction, updateBookAction, deleteBookAction, createBookAction } from '../controllers/localBooks.controller';

router.get('/', getAllBooksAction);
router.get('/:id', getBookAction);
router.post('/', createBookAction);
router.put('/:id', updateBookAction);
router.delete('/:id', deleteBookAction);

export default router;
