import express from 'express';

const router = express.Router();

import { paramsIdValidation } from '../validations/global.validation';
import { createSeriaAction, deleteSeriaAction, getPaginatedSeriesAction, getSeriaAction, getSeriesListAction, updateSeriaAction } from '../controllers/series.controller';
import { createSeriaValidation, getPaginatedSeriesValidation, updateSeriaValidation, getSeriesListValidation } from '../validations/series.validation';
import { uploadCoversMiddleware } from '../middlewares/upload.middleware';

router.post('/', createSeriaValidation, uploadCoversMiddleware.single('cover'),  createSeriaAction);
router.get('/', getPaginatedSeriesValidation, getPaginatedSeriesAction);
router.get('/list', getSeriesListValidation, getSeriesListAction);
router.get('/:id', paramsIdValidation, getSeriaAction);
router.put('/:id', updateSeriaValidation, updateSeriaAction);
router.delete('/:id', paramsIdValidation, deleteSeriaAction);

export default router;
