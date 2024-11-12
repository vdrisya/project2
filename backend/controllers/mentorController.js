// controllers/mentorController.js
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');

// POST /api/mentor/student - Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { email, dob, name, mentorId } = req.body;

    // Generate automatic password
    const password = email.slice(0, 3) + dob.replaceAll('-', '').slice(0, 3);

    const student = new Student({ email, dob, name, mentor: mentorId, password });
    await student.save();

    // Link student to the mentor
    await Mentor.findByIdAndUpdate(mentorId, { $push: { students: student._id } });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/mentor/students - Retrieve all students assigned to the mentor
exports.getMentorStudents = async (req, res) => {
  try {
    const students = await Student.find({ mentor: req.user.id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/mentor/student/:id/progress - Update student's project progress
exports.updateStudentProgress = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.progress = req.body.progress; // Set new progress data
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
