const nodemiler = require('nodemailer');
const emailMessages = require('../middleware/email.message');
const hbs = require('nodemailer-express-handlebars');

let transport = nodemiler.createTransport({
    service: 'Gmail',
    auth: {
        user: 'stomachcrew@gmail.com',
        pass: 'ache@123'
    },
    tls: {
        rejectUnauthorized: false
    }
});
transport.use('compile', hbs({
    viewEngine: {
        layoutsDir: './views/',
        partialsDir: './views/'
    },
    viewPath: './views/'
}));
module.exports.sendUserCreationEmail = (userdata, callback) => {
    mailOptions = {
        from: 'stomachcrew@gmail.com',
        to: userdata.emailId,
        subject: emailMessages.usercreation.sub,
        template: 'email_template',
        context:{
            userData:userdata
        }
    }

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            callback(emailMessages.emailSendingMsg.sendField);
        } else {
            callback(emailMessages.emailSendingMsg.success);
        }
    });
};