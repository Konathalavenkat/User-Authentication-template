const nodemailer = require("nodemailer");
const {senderemail, email_password}=require("../config/keys")
const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: senderemail,
      pass: email_password,
    },
  });
  const message = {
    to: emailTo,
    subject: subject,
    subject,
    html: `
        <div>
        <h3> Use this below code to ${content}</h3>
        <p><strong> Code: </strong>${code}</p>
        </div>
        `,
  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;