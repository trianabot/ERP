const mongoose = require('mongoose');


const BrandsModel = require('../models/brands/brands.model');


exports.createNewBrand = (req, res, nex)=>{
    
    const brandModel = new BrandsModel({
        _id: new mongoose.Types.ObjectId(),
        brandName: req.body.brandName,
        brandAliasName: req.body.brandAliasName,
        brandLogo: req.body.brandLogo,
    });

    brandModel.save()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                message:'Your new Brand is created successfully',
                data:doc
            });
        }
    })
    .catch(error=>{
        res.status(500).json({
            message:'Internal server error',
            error:error
        });
    });
};