const express = require('express');
const router = express.Router();
const roleContorler = require('../controllers/role.controller');



router.post('/createrole', roleContorler.createRole);
router.get('/getallroles', roleContorler.getAllRoles);


module.exports = router;