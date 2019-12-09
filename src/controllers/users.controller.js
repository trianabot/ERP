const mongoose = require('mongoose');
const bycriptjs = require('bcryptjs');
const passGenerator = require('generate-password');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users/user.model');
const userMsgProp = require('../utility/user.messages');
const emailSender = require('../middleware/email-sender');
const emailMsgProp = require('../middleware/email.message');
const errorMsgProp = require('../utility/error.messages');

module.exports.createUser = (req, res, next) => {

    UsersModel.find(
        { $or: [{ emailId: req.body.emailId }, { mobile: req.body.mobile }] }
    ).exec()
        .then(doc => {
            if (doc.length >= 1) {
                return res.status(404).json({
                    message: userMsgProp.user.user_exist,
                    data: userMsgProp.user.user_creation_error
                });
            }
            const password = passGenerator.generate({
                length: 10,
                numbers: true,
                uppercase: true,
                symbols: true,
                strict: true
            });
            bycriptjs.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: errorMsgProp.internalserver,
                        error: err
                    });
                }
                //set encripted password to password field
                let userObj = new UsersModel({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    emailId: req.body.emailId,
                    password: hash,
                    mobile: req.body.mobile,
                    country: req.body.country,
                    state: req.body.state,
                    pinCode: req.body.pinCode,
                    compleetAddress: req.body.compleetAddress,
                    gender: req.body.gender,
                    profilePic: req.body.profilePic,
                    geographicalAddr:req.body.geographicalAddr,
                    role:req.body.role
                });
                req.body.password = hash;
                userObj.save(userObj)
                    .then(doc => {
                        if (doc) {
                            let userData = doc;
                            userData.password = password;
                            emailSender.sendUserCreationEmail(userData, (emalMsg) => {
                                if (emalMsg == emailMsgProp.emailSendingMsg.success) {
                                    res.status(200).json({
                                        message: userMsgProp.user.success + ' and ' + emailMsgProp.emailSendingMsg.success
                                    });
                                } else if (emalMsg == emailMsgProp.emailSendingMsg.sendField) {
                                    res.status(401).json({
                                        message: userMsgProp.user.success + ' bout,' + emailMsgProp.emailSendingMsg.sendField

                                    });
                                }
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: errorMsgProp.internalserver,
                            error: error
                        });

                    });

            });
        })
        .catch(error => {
            res.status(500).json({
                message: errorMsgProp.internalserver,
                error: error
            });
        });
};

module.exports.loginUser = (req, res, next) => {

    UsersModel.findOne(
        { $or: [{ emailId: req.body.emailId }, { mobile: req.body.mobile }] }
    ).populate("role")
    .exec()
        .then(doc => {
            if (doc) {
                if (!doc.isPasswordChanged) {
                    return res.status(404).json({
                        message: userMsgProp.user.user_pass_change,
                        data: {
                            emailId: doc.emailId
                        }
                    });
                }
                bycriptjs.compare(req.body.password, doc.password, (err, result) => {
                    if (!result) {
                        return res.status(404).json({
                            status: userMsgProp.auth.authfaild,
                            message: userMsgProp.auth.badcrid
                        })
                    }
                    if (result) {
                        let token = jwt.sign(
                            { emailId: doc.emailId, userId: doc._id },
                            process.env.JWT_KEY,
                            { expiresIn: "1h" },
                        );
                        if (doc.profilePic) {
                            const img_name = req.protocol + '://' + req.headers.host + '/hero/' + doc.profilePic;
                            doc.profilePic = img_name;
                        }
                        res.status(200).json({
                            message: userMsgProp.user.login_success,
                            token: "Bearer " + token,
                            data: doc
                        });
                    }
                });
            } else {
                return res.status(404).json({
                    status: userMsgProp.auth.authfaild,
                    message: userMsgProp.auth.badcrid
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: errorMsgProp.internalserver,
                error: error
            });
        });
};

module.exports.generateNewPass = (req, res, next) => {

    UsersModel.findOne(
        { $or: [{ emailId: req.body.emailId }, { mobile: req.body.mobile }] }
    ).exec()
        .then(doc => {
            if (doc) {
                if(doc.isPasswordChanged){
                    return res.status(404).json({
                        message:userMsgProp.user.pass_already_genn
                    });
                }
                bycriptjs.compare(req.body.oldpass, doc.password, (err, result) => {
                    if (!result) {
                        return res.status(404).json({
                            status: userMsgProp.auth.authfaild,
                            message: userMsgProp.auth.badcrid
                        });
                    }
                    if (result) {
                        bycriptjs.hash(req.body.newpass, 10, (err, hash) => {
                            if (err) {
                                return res.status(505).json({
                                    message: errorMsgProp.internalserver
                                });
                            }
                            UsersModel.updateOne({ _id: doc._id }, { $set: {isPasswordChanged:true, password:hash} }).exec()
                                .then(updatedDoc => {
                                    if (updatedDoc) {
                                        res.status(200).json({
                                            status: userMsgProp.user.new_pass_success,
                                            message: userMsgProp.user.login_again
                                        });
                                    }
                                })
                                .catch(error => {
                                    res.status(500).json({
                                        message: errorMsgProp.internalserver,
                                        error: error
                                    });
                                });
                        });

                    }
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: errorMsgProp.internalserver,
                error: error
            });
        });
};