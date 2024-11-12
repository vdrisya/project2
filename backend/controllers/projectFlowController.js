// controllers/projectFlowController.js
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');

// GET /api/project-flow - Retrieve project flow for all students and mentors
exports.getProjectFlow = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate('students'); // Populate student details for each mentor
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
