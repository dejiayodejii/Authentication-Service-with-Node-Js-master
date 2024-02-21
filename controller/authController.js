const UserModel = require("../models/user_model");
const Utils = require("../utils/generateToken");
const validateRegistrationInput = require("../validators/reg_validator");
const validateLoginInput = require('../validators/login_validator');
const Helpers = require('./helpers');

const Auth = {};


Auth.googleSignIn = async (req, res) => {
  const { id, email, name } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user) {
    const otp = Utils.generateOTP();

    await new UserModel({
      name,
      email,
      googleID: id,
      source: "Google",
      verificationCode: otp,
    }).save();

    Utils.sendOTP(email, otp);

    return res.status(200).json({ message: "User registered successfully!, An otp has been sent to your email to verify your account", });

  }
  //generate jwt token
  return res.status(200).json({ message: 'Login Succesful' });

}

Auth.signUp = async (req, res) => {
  const { error } = await validateRegistrationInput(req.body);

  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  const { email, password, phoneNumber, name } = req.body;

  try {
    const existingUser = await UserModel.findOne({
      email,
    });
    if (existingUser) {
      return res.status(400).json({
        message: "User with same email already exists!",
      });
    }
    const otp = Utils.generateOTP();

    await UserModel({
      name: name,
      phone: phoneNumber,
      email: email,
      password: Helpers.HashValue(password),
      source: 'Email',
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

Auth.login = async (req, res) => {

  try {
    const { email, password } = req.body;
    const { errors, isValid } = validateLoginInput({ email, password });

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const user = UserModel.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      errors.email = "No account matched with email provided";
      return res.status(404).json(errors);
    }
    if (user.source === 'Google') {
      errors.password =
        "Please use the 'Log in with Google' button to access your account";
      return res.status(401).json(errors);
    }
    let isPassword = Helpers.UnHashValue(password, user.password);
    if (isPassword) {
      //generate jwt token next
      return res.status(200).json({ message: 'Login Succesful' });
    } else {
      errors.password = "Password is incorrect";
      return res.status(401).json(errors);
    }

  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }



};


Auth.forgotPassword = async () => { };

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
Auth.resetPassword = async () => { };

module.exports = Auth;
