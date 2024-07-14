import express from 'express';

const router = express.Router();
import { createGenreAction, deleteGenreAction, getGenresByQueryAction } from '../controllers/genres.controller';
import { createGenreValidation } from '../validations/genres.validation';
import { paramsIdValidation, getByQueryValidation } from '../validations/global.validation';

router.post('/', createGenreValidation, createGenreAction);
router.get('/', getByQueryValidation, getGenresByQueryAction);
router.delete('/:id', paramsIdValidation, deleteGenreAction);

export default router;
