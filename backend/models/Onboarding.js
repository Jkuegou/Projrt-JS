const mongoose = require('mongoose'); 
 
const onboardingSchema = new mongoose.Schema({ 
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true // Ensure one onboarding record per user 
  }, 
  weight: { 
    type: Number, 
    required: true, 
    min: [1, 'Weight must be greater than 0'], 
    max: [1000, 'Weight must be less than 1000 kg'] 
  }, 
  trainingType: { 
    type: String, 
    required: true, 
    enum: ['Gain Weight', 'Build Muscle', 'Lose Fat'], 
    trim: true 
  }, 
  trainingSchedule: { 
    type: String, 
    required: true, 
    enum: ['Morning', 'Afternoon', 'Evening'], 
    trim: true 
  }, 
  createdAt: { 
    type: Date, 
    default: Date.now 
  }, 
  updatedAt: { 
    type: Date, 
    default: Date.now 
  } 
}, { 
  timestamps: true // Automatically manage createdAt and updatedAt 
}); 
 
// Pre-save middleware to update the updatedAt field 
onboardingSchema.pre('save', function(next) { 
  this.updatedAt = Date.now(); 
  next(); 
}); 
 
// Instance method to get formatted data 
onboardingSchema.methods.getFormattedData = function() { 
  return { 
    id: this._id, 
    userId: this.userId, 
    weight: this.weight, 
    trainingType: this.trainingType, 
    trainingSchedule: this.trainingSchedule, 
    createdAt: this.createdAt, 
    updatedAt: this.updatedAt 
  }; 
}; 
 
// Static method to find by userId 
onboardingSchema.statics.findByUserId = function(userId) { 
  return this.findOne({ userId }); 
}; 
 
const Onboarding = mongoose.model('Onboarding', onboardingSchema); 
 
module.exports = Onboarding;