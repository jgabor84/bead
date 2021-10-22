import { Request, Response, NextFunction } from "express";

export const mail = (req: Request, res: Response, next: NextFunction) => {
    const toAddress = req.body.email;
    

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'winezshop3',
    pass: 'Wombat11xx'
  }
});

var mailOptions = {
  from: 'winezshop3@gmail.com',
  to: toAddress,
  subject: "subject",
  text: "text"
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  next();
};