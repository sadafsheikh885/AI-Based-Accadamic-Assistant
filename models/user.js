const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    admissionNumber: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ["Student", "Faculty", "Admin"],
      required: true
    }
  },
  { timestamps: true }
);


// 🔐 HASH PASSWORD BEFORE SAVING (NO next error)
userSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("Hashing Error:", error);
  }
});


// 🔑 COMPARE PASSWORD METHOD (FOR LOGIN)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("User", userSchema);