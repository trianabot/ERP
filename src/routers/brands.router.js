const express = require('express');
const router = express.Router();

const brandsController = require('../controllers/brands.controller');


router.post('/createbrand', brandsController.createNewBrand);

module.exports = router;