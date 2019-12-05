const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryes.controller');



router.post('/createcategory', categoryController.createCategoryes);
router.get('/getallcategoryes', categoryController.getAllCategoryes);

module.exports = router;