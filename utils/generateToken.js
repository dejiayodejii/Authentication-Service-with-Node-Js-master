const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const process = require('dotenv').config();

function generateOTP() {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
}

const password = process.env.MAIL_PASSWORD;

function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dejiayodeji1@gmail.com",
      pass: password,
    },
  });

  const mailOptions = {
    from: "dejiayodeji1@gmail.com",
    to: email,
    subject: "Account Verification OTP",
    text: `Your OTP for account verification is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      throw error;
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { generateOTP, sendOTP };
