// http://www.codingpedia.org/ama/cleaner-code-in-nodejs-with-async-await-mongoose-calls-example#before
const mongoose = require("mongoose");
const fs = require("fs")
const _ = require('lodash')
const nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
const path = require('path')
const rootPath = require('../app')
var handlebars = require('handlebars');
require('dotenv').config()

const smtpConfig = {
  host: 'smtp.gmail.com',
  // port: 465,
  // secure: true, // use SSL, 
  // you can try with TLS, but port is then 587
  port: 587, // port for secure SMTP
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  auth: {
    user: process.env.MAIL, // Your email id
    pass: process.env.PASS_MAIL // Your password
  }
};

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    }
    else {
      callback(null, html);
    }
  });
};

exports.buy_product = async (req, res, next) => {
  const { name, phone, email, address } = req.body
  var transporter = nodemailer.createTransport(smtpConfig);
  var mailOptions = {
    from: 'kindleloverdotcom@gmail.com', // sender address
    to: email,
    subject: `Sent successfully`,
    html: `Hi there, we got your information: email: ${email}, \n name: ${name}, \n phone: ${phone}, \n address: ${address} \n `,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      console.log('Message sent: ' + info.response);
      res.json({
        result: "ok",
        message: `Sent successfully`
      });
    };
  });

  // readHTMLFile(path.join(rootPath.rootPath, 'views/emailTemplate.html'), function (err, html) {
  //   var transporter = nodemailer.createTransport(smtpTransport(smtpConfig));
  //   var template = handlebars.compile(html);
  //   var replacements = {
  //     name,
  //     email,
  //     phone,
  //     address
  //   };
  //   var htmlToSend = template(replacements);
  //   var mailOptions = {
  //     from: 'kindleloverdotcom@gmail.com',
  //     to: email,
  //     subject: `Successfully delivered`,
  //     html: htmlToSend
  //   };
  //   transporter.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       return false;
  //     } else {
  //       console.log('Message sent: ' + info.response);
  //       // return true;
  //       res.json({
  //         result: "ok",
  //         message: `Sent successfully`
  //       });
  //     };
  //   });
  // });

};
