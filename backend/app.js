// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
// const { authenticate } = require('./middleware/authMiddleware');
const { authenticate, authorize } = require('./middleware/authMiddleware');



dotenv.config(); // Load environment variables from .env

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing for all origins
app.use(express.json()); // Parse incoming JSON requests

// // Routes
// app.use('/api/auth', authRoutes); // Authentication routes (login, logout)
// app.use('/api/admin', verifyToken, adminRoutes); // Admin routes with token verification
// app.use('/api/mentor', verifyToken, mentorRoutes); // Mentor routes with token verification
// app.use('/api/student', verifyToken, studentRoutes); // Student routes with token verification
app.use('/api/admin', authenticate, authorize(['admin']), adminRoutes);
app.use('/api/mentor', authenticate, authorize(['mentor']), mentorRoutes);
app.use('/api/student', authenticate, authorize(['student']), studentRoutes);
app.use('/api/auth', authRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
