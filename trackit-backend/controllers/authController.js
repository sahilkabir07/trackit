const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.CRYPTO_SECRET;
console.log("AUTH CONTROLLER KEY:", SECRET_KEY);

const encryptResponse = (data) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(SECRET_KEY);

  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  return ciphertext;
};

exports.signup = async (req, res) => {
  try {
    const { email, password, age, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const encrypted = encryptResponse({ message: "User already exists" });
      return res.json({ data: encrypted });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, age, role });

    await newUser.save();
    const encrypted = encryptResponse({ message: "Signup successful" });
    res.json({ data: encrypted });
  } catch (err) {
    console.error("Signup Error:", err);
    const encrypted = encryptResponse({ message: "Error in signup" });
    res.json({ data: encrypted });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const encrypted = encryptResponse({ message: "User not found" });
      return res.json({ data: encrypted });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const encrypted = encryptResponse({ message: "Invalid credentials" });
      return res.json({ data: encrypted });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const encrypted = encryptResponse({
      message: "Login successful",
      token,
      role: user.role,
    });

    res.json({ data: encrypted });
  } catch (err) {
    console.error("Login Error:", err);
    const encrypted = encryptResponse({ message: "Error in login" });
    res.json({ data: encrypted });
  }
};
