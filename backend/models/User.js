const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },

  // Ajouts onboarding
  gender: { type: String },
  age: { type: Number },
  dateOfBirth: { type: Date },
  height: { type: Number },
  weight: { type: Number },
  bmi: { type: Number },
  bmiCategory: { type: String },
  workoutDays: [{ type: String }],
  workoutTime: { type: String },
  sessionsPerWeek: { type: Number },
  fitnessGoals: [{ type: String }],
  targetBodyParts: [{ type: String }],
  onboardingCompleted: { type: Boolean, default: false },
  onboardingCompletedAt: { type: Date },

  // ✅ Préférences utilisateur
  preferences: {
    language: { type: String, default: 'fr' },
    darkMode: { type: Boolean, default: false },
    emailNotifications: { type: Boolean, default: true },
  }

}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
