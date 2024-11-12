// models/ProjectFlow.js
const mongoose = require('mongoose');

const projectFlowSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  updates: [{
    date: {
      type: Date,
      default: Date.now,
    },
    detail: String,
    additionalLearnings: String,
  }],
});

module.exports = mongoose.model('ProjectFlow', projectFlowSchema);
