const mongoose = require('mongoose');
const xlsx = require('xlsx');

const brandResMessages = require('../utility/products.messages');

const PartsModel = require('../models/parts/parts.model');

module.exports.saveRawPartsData = (req, res, next) => {

    const fileName = req.params.rawFileName + "-" + req.file.originalname;
    console.log(fileName);
    const workBook = xlsx.readFile('./mediafiles/' + fileName, { cellDates: true });
    const workSheet = workBook.Sheets['Parts'];
    const partsXlData = xlsx.utils.sheet_to_json(workSheet);
    if (partsXlData.length >= 1) {
        PartsModel.collection.insertMany(partsXlData)
            .then(doc => {
                res.status(200).json({
                    message: 'parts saved successfully',
                    insertedCount: doc.insertedCount,
                    data: doc.ops
                });
            })
            .catch(error => {
                res.status(500).json({
                    message: 'internal server error',
                    error: error
                });
            });
    }
};



module.exports.getAllParts = (req, res, next) => {
    PartsModel.find()
        .populate('products')
        .populate("category")
        .populate("brand")
        .exec()
        .then(doc => {
            if (doc.length >= 1) {
                doc.map((part => {
                    if (part.partlogo && part.partlogo != null) {
                        part.partlogo = req.protocol + '://' + req.headers.host + '/erp' + part.partlogo;
                    }
                    if(part.product.productLogo && !part.product.productLogo.includes(req.protocol)){
                        part.product.productLogo = req.protocol + '://' + req.headers.host + '/erp' + part.product.productLogo;
                    }
                    if (part.brand.brandLogo) {
                        if (!part.brand.brandLogo.includes(req.protocol)) {
                            part.brand.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + part.brand.brandLogo;
                        }

                        // part.brand.brandLogo = req.protocol + '://' + req.headers.host + '/erp/' + part.brand.brandLogo;
                    }
                    if (part.category.catLogo && !part.category.catLogo.includes(req.protocol)) {
                        part.category.catLogo = req.protocol + '://' + req.headers.host + '/erp/' + part.category.catLogo;
                    }
                }));
                res.status(200).json({
                    message: brandResMessages.datafound,
                    totalparts: doc.length,
                    data: doc
                });
            } else {
                res.status(200).json({
                    message: brandResMessages.datafound,
                    data: doc
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'internal server error',
                error: error
            });
        });
};

