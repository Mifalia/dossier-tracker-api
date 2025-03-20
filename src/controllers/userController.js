// controllers/userController.js
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};