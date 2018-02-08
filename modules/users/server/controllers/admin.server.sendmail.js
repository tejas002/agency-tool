var nodemailer = require('nodemailer'),
config = require('../config/user.sendmail.config')();
//console.log('config mial',config)
var transporter = nodemailer.createTransport(config.smtpConfig);

exports.sendmail = function(toAddress,subjectText,messageText,cbfunction,cbError){
// create reusable transporter object using the default SMTP transport 

 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: config.mailOptions.from, // sender address 
    to: toAddress, // list of receivers 
    subject: subjectText, // Subject line 
    text: messageText, // plaintext body 
    html: '<b>'+ messageText +'</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        cbError(error);
    } else {
		cbfunction(info);
	}
});

}
