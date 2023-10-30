import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createLibraryAction, deleteLibraryBookAction, getLibraryBookAction, getPaginatedLibraryAction, updateLibraryBookAction } from '../controllers/library.controller';
import { createLibraryValidation, getPaginatedLibraryValidation, updateLibraryValidation } from '../validations/library.validation';

router.post('/', createLibraryValidation, createLibraryAction);
router.get('/user/:id', getPaginatedLibraryValidation, getPaginatedLibraryAction);
router.get('/:id', paramsIdValidation, getLibraryBookAction);
router.put('/:id', updateLibraryValidation, updateLibraryBookAction);
router.delete('/:id', paramsIdValidation, deleteLibraryBookAction);

export default router;
