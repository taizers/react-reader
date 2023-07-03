const Router = require('express');
const router = new Router();
const usersController = require('../controller/users.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, usersController.getAllUsers);
router.get('/:id', authMiddleware, usersController.getUser);
router.put('/', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);

module.exports = router;
