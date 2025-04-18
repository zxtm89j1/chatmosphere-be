// controllers/authController.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
// const { validateRequest } = require("../utils/validators"); // adjust path if you have a custom validator

const saltRounds = 10;

const validateRequest = (email, password, confirmPassword) => {
  const errors = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isEmailValid = emailRegex.test(email);
  let isPasswordValid = password.length >= 8;
  let isConfirmPasswordValid = password === confirmPassword;

  if (!email) {
    errors.push("Email is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  if (!isEmailValid) {
    errors.push("Invalid email address.");
  }

  if (!isPasswordValid) {
    errors.push("Password must be equal to or greater than 8 characters.");
  }

  if (!isConfirmPasswordValid) {
    errors.push("Passwords must match.");
  }

  return errors;
};

const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const errors = validateRequest(email, password, confirmPassword);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User signed up successfully!",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export default { signup };
