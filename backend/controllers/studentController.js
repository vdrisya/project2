// controllers/studentController.js
const Student = require('../models/Student');

// GET /api/student/project-status - Retrieve student's current project status
exports.getStudentProjectStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json(student.progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/student/project-status - Update student's project status
exports.updateProjectStatus = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.progress = req.body.progress; // Update project progress
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
