const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String
    },
    mobile:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    compleetAddress:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    isPasswordChanged:{
        type:Boolean, default:false
    },
    geographicalAddr:{
        type:Object
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Roles',
        required:true
    }
});


module.exports = mongoose.model('Users', UserSchema);