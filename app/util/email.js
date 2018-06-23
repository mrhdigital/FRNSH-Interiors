var nodemailer = require('nodemailer');
var emailutils = {}

emailutils.email = function (firstname, lastname, email) {
    // Setup the email transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nitu.r.prodhani@gmail.com', // Your email id
            pass: 'success123' // Your password
        }
    });

    // Message text
    var text = 'Hello' + firstname + ' ' + lastname + 'your account has been registered with us. Please use your login id,' + email + ' to log into the site and enjoy our services. Thank you.';
    var mailOptions = {
        from: 'nitu.r.prodhani@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Welcome, your registration is successful!', // Subject line
        text: text //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("Cannot send email please check configurations: "+ error);
        } else {
            console.log('Message sent: ' + info.response);
        };
    });
}
module.exports = emailutils;