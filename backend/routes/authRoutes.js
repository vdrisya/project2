// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// POST /api/auth/login - Log in as admin, mentor, or student
router.post('/login', loginUser);

module.exports = router;



// const express = require('express');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config(); // Load environment variables

// const router = express.Router();

// // Mock user data (replace with your database user lookup logic)
// const users = [
//   { id: 1, email: 'mentor1@gmail.com', password: 'mentor1', role: 'mentor' },
//   { id: 2, email: 'admin1@gmail.com', password: 'admin1', role: 'admin' },
// ];

// // Login route to authenticate and generate token
// router.post('/login', (req, res) => {
//   const { email, password, role } = req.body;

//   // Find user in database (mocked here)
//   const user = users.find(u => u.email === email && u.password === password && u.role === role);

//   if (!user) {
//     return res.status(401).json({ message: 'Invalid email, password, or role' });
//   }

//   // Generate JWT
//   const token = jwt.sign(
//     { id: user.id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '1min ' } // Token expires in 1 hour
//   );

//   res.json({ token });
// });

// module.exports = router;
