const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  universityName: String,
  dateOfBirth: Date,
  levelOfEducation: String,
  joiningYear: Number,
  jobTitle: String,
});

module.exports = mongoose.model('Student', studentSchema);
