const express = require('express'), router = express.Router(), crypto = require('crypto');


// Import Controllers
const UserController = require('../controllers/UserController'), AuthController = require('../controllers/AuthController');

// Login Controller
router.get('/login', AuthController.login);

// User's routes
router.post('/users', UserController.store);
router.get('/users', UserController.index);
router.get('/users/:username', UserController.find);

// News' Controller
router.get('/news', function (req, res) {
    let body = req.body;
    if(verifyHash(req.body.hash)){
        let news = { title : "Denise come pastel"};
        res.send(news).status(200);
    }
    res.sendStatus(401);
});

module.exports = router;
