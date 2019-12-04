const mongoose = require('mongoose');


const brandsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        default:false
    }
});

module.exports = mongoose.model('Brands', brandsSchema);
