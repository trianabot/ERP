const mongoose = require('mongoose');
const brandResMessages = require('../utility/products.messages');

const BrandsModel = require('../models/brands/brands.model');


exports.createNewBrand = (req, res, nex) => {

    const brandModel = new BrandsModel({
        _id: new mongoose.Types.ObjectId(),
        brandId:req.body.brandId,
        brandName: req.body.brandName,
        brandAliasName: req.body.brandAliasName,
        brandLogo: req.body.brandLogo,
        company: req.body.company
    });

    brandModel.save()
        .then(doc => {
            if (doc) {
                if (doc.brandLogo) {
                    doc.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + doc.brandLogo;
                }
                res.status(200).json({
                    message: brandResMessages.brand.success,
                    data: doc
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Internal server error',
                error: error
            });
        });
};

module.exports.getAllBrands = (req, res, next)=>{
    BrandsModel.find()
    .exec()
    .then(doc=>{
        if(doc.length>=1){
            doc.map((brand)=>{
                if(brand.brandLogo){
                    brand.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + brand.brandLogo;
                }
            });

            res.status(200).json({
                message:brandResMessages.datafound,
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