const nodemailer = require('nodemailer'),
      config = require('../config/config')


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: config.EMAIL_SERVICE,
    auth: {user: config.EMAIL_USER, pass: config.EMAIL_PASS}
})


// Sends token ladden email messages to confirm actions
module.exports.sendmail = function(fromAddress, toAddress, subject, data) {
        return new Promise((resolve, reject) => {
        // setup email data with unicode symbols
        let mailOptions = {
            from: fromAddress, // sender address
            to: toAddress, // list of receivers
            subject: subject, // Subject line
            html: data.html
        }

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        })

    })
}