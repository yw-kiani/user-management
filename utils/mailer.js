const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'memonabdulwasiu1@gmail.com',
    pass: 'uhur jmgf pubo uufs'
  }
});

const sendAlertEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"Security Alert" <memonabdulwasiu1@gmail.com>',
    to,
    subject,
    text
  });
};

module.exports = sendAlertEmail;

