const jwt = require('jsonwebtoken');
const errorMsgProp = require('../utility/error.messages');

module.exports.apiValidation = (req, res, next)=>{
    try{
        if (req.headers.authorization == undefined) {
            return res.status(400).json({
                message:'Authorization Header is required'
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch{
        return res.status(401).json({
            message:errorMsgProp.unautherized
        });
    }
};
