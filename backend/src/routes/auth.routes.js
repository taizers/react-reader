import express from 'express';

const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const router = express.Router();

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 30 }),
  authController.login
);
router.post('/logout', authController.logout);
router.post(
  '/signUp',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 30 }),
  authController.signUp
);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

export default router;
