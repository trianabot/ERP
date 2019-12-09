const mongoose = require('mongoose');
const RoleModel = require('../models/roles/roles.model');
const userMess = require('../utility/user.messages');

module.exports.createRole = (req, res, next)=>{

    RoleModel.collection.insertOne(req.body)
    .then(doc=>{
        if(doc){
            res.status(200).json({
                message:userMess.role.success,
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