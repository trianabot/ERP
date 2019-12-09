const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.post('/createuser', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/generatepass', userController.generateNewPass);

module.exports = router;