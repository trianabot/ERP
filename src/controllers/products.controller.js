const mongoose = require('mongoose');

const xlsx = require('xlsx');

const brandResMessages = require('../utility/products.messages');
const ProductsModel = require('../models/products/products.model');


module.exports.saveRawProductData = (req, res, next) => {

    const fileName = req.params.rawFileName + "-" + req.file.originalname;
    console.log(fileName);
    const workBook = xlsx.readFile('./mediafiles/' + fileName, { cellDates: true });
    const workSheet = workBook.Sheets['Products'];
    const productsXlData = xlsx.utils.sheet_to_json(workSheet);

    if (productsXlData.length >= 1) {
        ProductsModel.collection.insertMany(productsXlData)
            .then(doc => {
                res.status(200).json({
                    message: 'Products saved successfully',
                    insertedCount:doc.insertedCount,
                    data: doc.ops
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'Internal server error',
                    error: error
                });
            });
    }
};

module.exports.getAllProducts = (req, res, next)=>{
    ProductsModel.find()
    .populate("category")
    .populate("brand")
    .exec()
    .then(doc=>{
        if(doc.length>=1){
            doc.map((product=>{
                if(product.productLogo && product.productLogo!=null){
                    product.productLogo = req.protocol + '://' + req.headers.host + '/erp/' + product.productLogo;
                }
                if(product.brand.brandLogo){
                    product.brand.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + product.brand.brandLogo;
                }
                if(product.category.catLogo){
                    product.category.catLogo = req.protocol + '://' + req.headers.host + '/erp/' + product.category.catLogo;
                }
            }));
            res.status(200).json({
                message:brandResMessages.datafound,
                totalProducts:doc.length,
                data:doc
            });
        }else{
            res.status(200).json({
                message: brandResMessages.datafound,
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
