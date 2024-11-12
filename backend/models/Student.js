// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  projectTopic: {
    type: String,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true,
  },
  progress: [{
    phase: {
      type: String,
      enum: [
        'Project Initialization and Planning',
        'Design Phase',
        'Backend Development',
        'Frontend Development',
        'Frontend and Backend Integration',
        'Authentication and Authorization',
        'Testing and Validation',
        'Deployment and Hosting',
        'Project Documentation'
      ],
    },
    status: {
      type: String,
      enum: ['Not Started', 'Doing', 'Done'],
      default: 'Not Started',
    },
  }],
});

module.exports = mongoose.model('Student', studentSchema);
