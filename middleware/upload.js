const multer = require("multer");
const path = require("path");

/* STORAGE */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

/* FILE FILTER */
const fileFilter = (req, file, cb) => {
  const allowed =
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel";

  if (allowed) cb(null, true);
  else cb(new Error("Only PDF, Word, Excel allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;