const express = require('express'), router = express.Router(), crypto = require('crypto');


// Import Controllers
const UserController = require('../controllers/UserController'), AuthController = require('../controllers/AuthController'), NewsController = require('../controllers/NewsController');

// Login Controller
router.post('/login', AuthController.login);

// User's routes
router.post('/users', UserController.store);
router.get('/users', UserController.index);
router.get('/users/:username', UserController.find);

// News' Routers
router.post('/news', NewsController.store);
router.get('/news', NewsController.index);
router.get('/news/:id', NewsController.indexById);
router.get('/news/theme/:theme', NewsController.indexByTheme);
router.delete('/news/:id', NewsController.remove);
router.put('/news/:id', NewsController.update);


module.exports = router;
