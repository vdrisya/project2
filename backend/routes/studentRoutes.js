// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const { getStudentProjectStatus, updateProjectStatus } = require('../controllers/studentController');

// GET /api/student/project-status - Retrieve student's current project status
router.get('/project-status', getStudentProjectStatus);

// PUT /api/student/project-status - Update student's project status
router.put('/project-status', updateProjectStatus);

module.exports = router;
