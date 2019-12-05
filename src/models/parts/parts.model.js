const mongoose = require('mongoose');

const partsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    partName: { type: String, required: true },
    partId: { type: String, required: true },
    partNumber: { type: String },
    partModelNumber: { type: String, required: true },
    partExpires: { type: String },
    partMfDate: { type: String, required: true },
    partMfPlantName: { type: String },
    partlogo: { type: String },
    partPlantAddress: { type: String, required: true },
    partCost: { type: String, required: true },

    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoryes',
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
        required: true
    }
});

module.exports = mongoose.model('Parts', partsSchema);
