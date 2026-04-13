const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
    times: {
      type: [String], // ["9-10","7-8","4-5","3-4"]
      required: true,
    },
    timetable: {
      type: Object, // 👈 dynamic keys (Monday → time → subject)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", timetableSchema);