const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    productId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        required: true
    },
    modelNumber: {
        type: String,
        required: true
    },
    productExpires: {
        type: String
    },
    mfDate: {
        type: String,
        required: true
    },
    mfPlantName: {
        type: String,
        required: true
    },
    mfPlantAddress: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productLogo:{
        type:String
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoryes',
        required: true
    }
});



module.exports = mongoose.model('Products', productsSchema);