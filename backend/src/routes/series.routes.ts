import express from 'express';

const router = express.Router();

import { createSeriaAction, deleteSeriaAction, getPaginatedSeriesAction, getSeriaAction, updateSeriaAction } from '../controllers/series.controller';
import { createSeriaValidation, deleteSeriaValidation, getPaginatedSeriesValidation, getSeriaValidation, updateSeriaValidation } from '../validations/series.validation';

router.post('/', createSeriaValidation, createSeriaAction);
router.get('/', getPaginatedSeriesValidation, getPaginatedSeriesAction);
router.get('/:id', getSeriaValidation, getSeriaAction);
router.put('/:id', updateSeriaValidation, updateSeriaAction);
router.delete('/:id', deleteSeriaValidation, deleteSeriaAction);

export default router;
