const mongoose = require('mongoose');
const RoleModel = require('../models/roles/roles.model');
const userMess = require('../utility/user.messages');

module.exports.createRole = (req, res, next)=>{

    RoleModel.collection.insertOne(req.body)
    .then(doc=>{
        if(doc){
            res.status(200).json({
                message:userMess.role.role_created_succ,
                data:doc.ops
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

module.exports.getAllRoles = (req, res, next)=>{

    RoleModel.find().exec()
    .then(doc=>{
        if(doc.length>=1){
            res.status(200)
            .json({
                message:userMess.role.all_role_found,
                data:doc
            });
        }else{
            res.status(200).json({
                message:userMess.role.all_role_found,
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