module.exports = function(){
	return {
  smtpConfig:{
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL 
	  ignoreTLS: true,
    auth: {
        user: process.env.adminEmail || 'admin@gmail.com',
        pass: process.env.adminPass || 'Admin@12345'
    }
  },
  mailOptions: {
	  from : 'Admin',
	  to:'bbc@myssmtp.com'
  }
}
}