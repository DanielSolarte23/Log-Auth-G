import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    sparse: true
  },
  resetPasswordToken: {
    type: String,
    sparse: true
  },
  resetPasswordExpires: {
    type: Date,
    sparse: true
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', userSchema);