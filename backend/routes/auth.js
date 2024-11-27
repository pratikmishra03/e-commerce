const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



// Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if username, email, or password is empty
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, and password are required." });
  }

  // Check if a user with the same username already exists
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({ message: "Username is already in use." });
  }

  // Check if a user with the same email already exists
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ message: "Email is already in use." });
  }

  // Hashing the password
  const hashedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  //   const { username, password } = req.body;

  // Check if username, email, or password is empty
  if (!req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "User is not Registered!" });
    }

    // Decrypting the password
    const unHashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (unHashedPassword !== req.body.password) {
      return res.status(401).json({ message: "Wrong Password!" });
    }

    //JWT Authentication
    const accessToken = jwt.sign({
        id: user._id,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})

    // While comparing password it prevents to show even hashed password in log
    const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
