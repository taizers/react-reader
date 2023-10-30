import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createSeriaAction, deleteSeriaAction, getPaginatedSeriesAction, getSeriaAction, updateSeriaAction } from '../controllers/series.controller';
import { createSeriaValidation, getPaginatedSeriesValidation, updateSeriaValidation } from '../validations/series.validation';

router.post('/', createSeriaValidation, createSeriaAction);
router.get('/', getPaginatedSeriesValidation, getPaginatedSeriesAction);
router.get('/:id', paramsIdValidation, getSeriaAction);
router.put('/:id', updateSeriaValidation, updateSeriaAction);
router.delete('/:id', paramsIdValidation, deleteSeriaAction);

export default router;
