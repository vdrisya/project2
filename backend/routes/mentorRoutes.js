// routes/mentorRoutes.js
const express = require('express');
const router = express.Router();
const {
  addStudent,
  getMentorStudents,
  updateStudentProgress
} = require('../controllers/mentorController');

// POST /api/mentor/student - Add a new student (CRUD)
router.post('/student', addStudent);

// GET /api/mentor/students - Retrieve all students assigned to the mentor
router.get('/students', getMentorStudents);

// PUT /api/mentor/student/:id/progress - Update student's project progress
router.put('/student/:id/progress', updateStudentProgress);

module.exports = router;
