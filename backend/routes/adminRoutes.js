// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  addMentorToCourse
} = require('../controllers/adminController');

// Middleware applied for authentication and role-based authorization
// Only accessible by authenticated users with the 'admin' role

// POST /api/admin/course - Add a new course (CRUD)
router.post('/course', authenticate, authorize(['admin']), addCourse);

// GET /api/admin/courses - Retrieve all courses
router.get('/courses', authenticate, authorize(['admin']), getCourses);

// PUT /api/admin/course/:id - Update a specific course by ID
router.put('/course/:id', authenticate, authorize(['admin']), updateCourse);

// DELETE /api/admin/course/:id - Delete a specific course by ID
router.delete('/course/:id', authenticate, authorize(['admin']), deleteCourse);

// POST /api/admin/course/:courseId/mentor - Add a mentor to a specific course
router.post('/course/:courseId/mentor', authenticate, authorize(['admin']), addMentorToCourse);

module.exports = router;
