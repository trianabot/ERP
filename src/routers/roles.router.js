const express = require('express');
const router = express.Router();
const roleContorler = require('../controllers/role.controller');



router.post('/createrole', roleContorler.createRole);



module.exports = router;