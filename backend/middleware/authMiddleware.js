// authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Replace with environment variable for production

// Middleware to authenticate users by verifying JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify and decode token
    req.user = decoded; // Attach decoded token (user info) to request object
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware to authorize users based on role
const authorize = (roles) => (req, res, next) => {
  // Check if user role exists in the allowed roles array
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access Forbidden. Insufficient permissions.' });
  }
  next(); // Proceed if authorized
};

module.exports = { authenticate, authorize };
