// routes/projectFlowRoutes.js
const express = require('express');
const router = express.Router();
const { getProjectFlow } = require('../controllers/projectFlowController');

// GET /api/project-flow - Retrieve project flow for all students and mentors
router.get('/', getProjectFlow);

module.exports = router;
