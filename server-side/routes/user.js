const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/users', UserController.findUsers);
router.post('/login', UserController.login);
router.post('/register', UserController.resgister);



module.exports = router