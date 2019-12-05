const express = require('express');
const router = express.Router();

const brandsController = require('../controllers/brands.controller');


router.post('/createbrand', brandsController.createNewBrand);
router.get('/getallbrands', brandsController.getAllBrands);




module.exports = router;