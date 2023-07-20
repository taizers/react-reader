import express from 'express';
import { getAllUsersAction, getUserAction, updateUserAction, deleteUserAction } from '../controllers/users.controller';
import { getUserValidation, getUsersValidation, updateUserValidation, deleteUserValidation } from '../validations/users.validation';

const router = express.Router();

router.get('/', getUsersValidation, getAllUsersAction);
router.get('/:id', getUserValidation, getUserAction);
router.put('/:id', updateUserValidation, updateUserAction);
router.delete('/:id', deleteUserValidation, deleteUserAction);

export default router;
