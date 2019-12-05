const mongoose = require('mongoose');

const categoryesSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    catId:{
        type:String,
        required:true
    },
    catName:{
        type:String,
        required:true,
    },
    catAliasName:{
        type:String
    },
    catModel:{
        type:String
    },
    catStatus:{
        type:String,
        default:true
    },
    catLogo:{
        type:String
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
        required: true
    }
});



module.exports = mongoose.model('Categoryes', categoryesSchema);