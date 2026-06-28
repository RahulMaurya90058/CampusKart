import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


import jwt from "jsonwebtoken";



// export const signup = async (req, res) => {
//   res.json({ message: "Signup API Working" });
// };
export const signup = async (req, res) => {
  try {
    console.log("✅ Step 1: Signup API Called");

    const { name, email, password } = req.body;

    console.log("✅ Step 2: Data Received", { name, email });

    let existingUser = await User.findOne({ email });

    console.log("✅ Step 3: User Checked");

    if (existingUser && existingUser.isVerified) {
      console.log("❌ Verified User Already Exists");

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    console.log("✅ Step 4: OTP Generated", otp);

    if (existingUser) {
      existingUser.name = name;
      existingUser.password = password;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;

      await existingUser.save();

      console.log("✅ Step 5: Existing User Updated");
    } else {
      existingUser = await User.create({
        name,
        email,
        password,
        otp,
        otpExpiry,
      });

      console.log("✅ Step 5: New User Created");
    }

    console.log("✅ Step 6: Before sendEmail");

    await sendEmail(
      email,
      "CampusKart OTP Verification",
      `Your OTP is ${otp}`
    );

    console.log("✅ Step 7: Email Sent Successfully");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("❌ Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const verifyOtp = async (req, res) => {
//   res.json({ message: "Verify OTP API Working" });
// };

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;




    await user.save();

    res.status(200).json({
      success: true,
      message: "Account verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};