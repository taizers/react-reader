const Router = require('express');
const router = new Router();
const booksController = require('../controller/books.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/search', authMiddleware, booksController.getBooks);
// router.get('/author', authMiddleware, booksController.getBooksByAuthor);

module.exports = router;
