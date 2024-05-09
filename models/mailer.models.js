const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET,
  },
});

transporter.verify().then(() => {
  console.log('Listo para enviar mails');
});

module.exports = transporter