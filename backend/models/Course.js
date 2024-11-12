// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  mentors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
  }]
});

module.exports = mongoose.model('Course', courseSchema);
