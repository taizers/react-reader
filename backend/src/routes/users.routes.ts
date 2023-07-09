import express from 'express';
import { getAllUsersAction, getUserAction, updateUserAction, deleteUserAction } from '../controllers/users.controller';

const router = express.Router();

router.get('/', getAllUsersAction);
router.get('/:id', getUserAction);
router.put('/', updateUserAction);
router.delete('/:id', deleteUserAction);

export default router;
