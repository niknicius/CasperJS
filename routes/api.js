const express = require('express'), router = express.Router(), crypto = require('crypto');


// Import Controllers
const UserController = require('../controllers/UserController'), AuthController = require('../controllers/AuthController'), NewsController = require('../controllers/NewsController');

// Login Controller
router.get('/login', AuthController.login);

// User's routes
router.post('/users', UserController.store);
router.get('/users', UserController.index);
router.get('/users/:username', UserController.find);

// News' Controller
router.post('/news', NewsController.store);
router.get('/news/theme/:theme', NewsController.indexByTheme);



module.exports = router;
