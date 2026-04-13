const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: String,
  subject: String,
  dueDate: Date,

  submissions: [
    {
      studentName: String,
      fileUrl: String,
      submittedAt: Date,
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);