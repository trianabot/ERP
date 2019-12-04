const express = require('express');
const router = express.Router();
const multer = require('multer');

const path = require('path');
const mkdirp = require('mkdirp');


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const dir = './mediafiles/'

        mkdirp(dir, err => cb(err, dir));       
    },
    filename: (req, file, cb)=>{
        const fileName = req.params.coustomeName+"-"+file.originalname;

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
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    }
});

router.post('/uploads/:coustomeName', upload.single('mediafile'), (req, res, next)=>{
    res.status(200).json({
        message:'image uploaded successfully',
        imageName:req.params.coustomeName+"-"+req.file.originalname,
        profilePicUrl:req.protocol + '://' + req.headers.host + '/erp/' + req.params.coustomeName+"-"+req.file.originalname
    });

});


module.exports = router;