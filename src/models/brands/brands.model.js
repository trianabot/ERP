const mongoose = require('mongoose');


const brandsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brandId:{
        type:String,
        required:true
    },
    brandName:{
        type:String,
        required:true
    },
    brandAliasName:{
        type:String
    },
    brandLogo:{
        type:String
    },
    brandStatus:{
        type:Boolean,
        default:true
    },
    company:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Brands', brandsSchema);
