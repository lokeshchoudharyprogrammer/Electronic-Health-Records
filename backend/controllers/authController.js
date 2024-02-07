const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15hr' });
};

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;
  console.log(email, password, role )
  try {

    const { email, password, role } = req.body;
    const newUser = new User({ email, password, role });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = generateAccessToken(user);
    res.status(200).json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
