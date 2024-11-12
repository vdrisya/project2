// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { email, password ,role} = req.body;
  try {
    const user = await User.findOne({ email, password,role });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate a token with role-based access
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
