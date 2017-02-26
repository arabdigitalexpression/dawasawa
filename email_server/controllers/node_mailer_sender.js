const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gundourtesting@gmail.com',
        pass: 'gundour1234'
    }
})


// Sends token ladden email messages to confrm actions
module.exports.sendmail = function(fromAddress, toAddress, subject, data) {
        return new Promise((resolve, reject) => {
        // setup email data with unicode symbols
        let mailOptions = {
            from: 'gundourtesting@gmail.com', // sender address
            to: toAddress, // list of receivers
            subject: subject, // Subject line
            html: data.html
        }
        console.log(mailOptions)

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            }
            resolve(info)
        })

    })
}