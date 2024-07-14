import express from 'express';

const router = express.Router();
import { createTagAction, deleteTagAction, getTagsByQueryAction } from '../controllers/tags.controller';
import { createTagValidation } from '../validations/tags.validation';
import { paramsIdValidation, getByQueryValidation } from '../validations/global.validation';

router.post('/', createTagValidation, createTagAction);
router.get('/', getByQueryValidation, getTagsByQueryAction);
router.delete('/:id', paramsIdValidation, deleteTagAction);

export default router;
