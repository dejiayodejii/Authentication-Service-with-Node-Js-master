const UserModel = require("../models/user_model");
const Utils = require("../utils/generateToken");
const bcryptjs = require("bcryptjs");
const validateRegistrationInput = require("../validators/reg_validator");

const Auth = {};

Auth.signUp = async (req, res) => {
  const { error,} = await validateRegistrationInput(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  const { email, password, phoneNumber, name, source } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with same email already exists!",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    const otp = Utils.generateOTP();

    await UserModel({
      name: name,
      phone: phoneNumber,
      email: email,
      password: hashedPassword,
      source: source,
      verificationCode: otp,
    }).save();

    Utils.sendOTP(email, otp);

    res.status(200).json({
      message:
        "User registered successfully!, An otp has been sent to your email to verify your account",
    });
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({
      message: "An error occurred while signing up. Please try again later.",
    });
  }
};

Auth.login = async (req, res) => {};
Auth.forgotPassword = async (req, res) => {};

Auth.resendOtp = async (req, res) => {
  const email = req.body;

  // Find user by email
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    return res.status(404).send("User not found");
  }

  const otp = Utils.generateOTP();

  user.verificationCode = otp;
  Utils.sendOTP(email, otp);

  res.status(200).json({
    message: "OTP sent successfully",
  });
};

Auth.verifyAccount = async (req, res) => {
  const { email, otp } = req.body;

  // Find user by email
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    return res.status(404).send("User not found");
  }
   if (user.verificationCode === otp) {
     user.isVerified = true;
     return res.status(200).send("Account Verified Successfully!");
   } else {
     return res.status(400).send("Invalid OTP");
   }
};
Auth.resetPassword = async (req, res) => {};

module.exports = Auth;
