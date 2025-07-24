const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anonymous03146@gmail.com',
    pass: 'uhur jmgf pubo uufs'
  }
});

const sendAlertEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: '"Security Alert" <anonymous03146@gmail.com>',
    to,
    subject,
    text
  });
};

module.exports = sendAlertEmail;

