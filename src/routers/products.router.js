const express = require('express');
const router = express.Router();
const multer = require('multer');

const mkdirp = require('mkdirp');

const productsController = require('../controllers/products.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './mediafiles/'

        mkdirp(dir, err => cb(err, dir));
    },
    filename: (req, file, cb) => {
        const fileName = req.params.rawFileName + "-" + file.originalname;

        cb(null, fileName);
    }
});
// const fileFilter = (req, file, callback)=>{
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
//         callback(null, true);
//     }else{
//         callback(new Error('please upload PNG/JPEG type files'), false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});


router.post('/uploadrawproductfile/:rawFileName', upload.single('rawfile'), productsController.saveRawProductData);
router.get('/getallproducts', productsController.getAllProducts);


module.exports = router;