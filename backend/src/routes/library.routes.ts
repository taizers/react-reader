import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createLibraryBookAction, deleteLibraryBookAction, getLibraryBookAction, getPaginatedLibraryAction, updateLibraryBookAction } from '../controllers/library.controller';
import { createLibraryBookValidation, getPaginatedLibraryValidation, updateLibraryValidation } from '../validations/library.validation';

router.post('/', createLibraryBookValidation, createLibraryBookAction);
router.get('/user/:id', getPaginatedLibraryValidation, getPaginatedLibraryAction);
router.get('/:id', paramsIdValidation, getLibraryBookAction);
router.put('/', updateLibraryValidation, updateLibraryBookAction);
router.delete('/:id', paramsIdValidation, deleteLibraryBookAction);

export default router;
