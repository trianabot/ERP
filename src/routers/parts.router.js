const express = require('express');
const router = express.Router();
const multer = require('multer');

const mkdirp = require('mkdirp');

const partsController = require('../controllers/parts.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './mediafiles/'
        mkdirp(dir, err => cb(err, dir));
    },
    filename: (req, file, cb) => {
        const filename = req.params.rawFileName + "-" + file.originalname;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

router.post('/uploadrawpartfile/:rawFileName', upload.single('rawfile'), partsController.saveRawPartsData)
router.get('/getallparts', partsController.getAllParts);

module.exports = router;