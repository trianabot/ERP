const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    roleId:{
        type:String,
        required:true
    },
    roleName:{
        type:String,
        required: true
    },
    roleDesc:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    }
});




module.exports = mongoose.model('Roles', RoleSchema);