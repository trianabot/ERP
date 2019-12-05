const mongoose = require('mongoose');
const brandResMessages = require('../utility/products.messages');

const CategoryesModel = require('../models/categoryes/categoryes.model');


module.exports.createCategoryes = (req, res, next)=>{

    const categoryObj = new CategoryesModel({
        _id: new mongoose.Types.ObjectId(),
        catId: req.body.catId,
        catName: req.body.catName,
        catAliasName:req.body.catAliasName,
        catModel: req.body.catModel,
        catLogo: req.body.catLogo,
        brand: req.body.brand
    });
    categoryObj.save()
    .then(doc=>{
        if(doc){
            if(doc.catLogo){
                doc.catLogo = req.protocol + '://' + req.headers.host + '/erp/' + doc.catLogo
            }
            res.status(200).json({
                message:brandResMessages.categoryes.success,
                data:doc
            });
        }
    })
    .catch(error=>{
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    });
};

module.exports.getAllCategoryes = (req, res, next)=>{
    CategoryesModel.find()
    .populate('brand')
    .exec()
    .then(doc=>{
        if(doc.length>=1){
            doc.map((cat)=>{
                if(cat.catLogo){
                    cat.catLogo = req.protocol + '://' + req.headers.host + '/erp/' + cat.catLogo;
                    if(cat.brand.brandLogo){
                        cat.brand.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + cat.brand.brandLogo;
                    }
                }
            });
            res.status(200).json({
                message: brandResMessages.datafound,
                data: doc
            });
        }else{
            res.status(200).json({
                message:brandResMessages.datanotfound,
                data:doc
            });
        }
    })
    .catch(error=>{
        res.status(500).json({
            message: 'Internal server error',
            error: error
        });
    });
};