// controllers/adminController.js
const Course = require('../models/Course');
const Mentor = require('../models/Mentor');

// POST /api/admin/course - Add a new course
exports.addCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/admin/courses - Retrieve all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/admin/course/:id - Update a specific course by ID
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/admin/course/:id - Delete a specific course by ID
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/admin/course/:courseId/mentor - Add a mentor to a specific course
exports.addMentorToCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const mentor = new Mentor({ ...req.body, course: courseId });
    await mentor.save();

    // Link mentor to the course
    await Course.findByIdAndUpdate(courseId, { $push: { mentors: mentor._id } });
    res.status(201).json(mentor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
