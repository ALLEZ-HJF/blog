"use strict";
const nodemailer = require("nodemailer");
const { emailUser, emailPass } = require('../config/config')

async function sendEmail(to,title,text,body) {
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: emailUser, // generated ethereal user
      pass: emailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailUser, // sender address
    to: to, // list of receivers
    subject: title, // Subject line
    text: text, // plain text body
    html: body, // html body
  });

  return info
}

module.exports = sendEmail