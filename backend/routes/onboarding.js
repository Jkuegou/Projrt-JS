const express = require('express'); 
const router = express.Router(); 
const Onboarding = require('../models/Onboarding'); 
const auth = require('../middleware/auth'); // Assuming you have auth middleware 
const { body, validationResult } = require('express-validator'); 
 
// Validation middleware 
const validateOnboardingData = [ 
  body('weight') 
    .isFloat({ min: 1, max: 1000 }) 
    .withMessage('Weight must be a number between 1 and 1000 kg'), 
  body('trainingType') 
    .isIn(['Gain Weight', 'Build Muscle', 'Lose Fat']) 
    .withMessage('Training type must be one of: Gain Weight, Build Muscle, Lose Fat'), 
  body('trainingSchedule') 
    .isIn(['Morning', 'Afternoon', 'Evening']) 
    .withMessage('Training schedule must be one of: Morning, Afternoon, Evening') 
]; 
 
// POST /api/onboarding - Create or update onboarding data 
router.post('/', auth, validateOnboardingData, async (req, res) => { 
  try { 
    // Check for validation errors 
    const errors = validationResult(req); 
    if (!errors.isEmpty()) { 
      return res.status(400).json({ 
        success: false, 
        message: 'Validation failed', 
        errors: errors.array() 
      }); 
    } 
 
    const { weight, trainingType, trainingSchedule } = req.body; 
    const userId = req.user.id; // From auth middleware 
 
    // Check if onboarding data already exists for this user 
    let onboardingData = await Onboarding.findByUserId(userId); 
 
    if (onboardingData) { 
      // Update existing onboarding data 
      onboardingData.weight = weight; 
      onboardingData.trainingType = trainingType; 
      onboardingData.trainingSchedule = trainingSchedule; 
      onboardingData.updatedAt = new Date(); 
 
      await onboardingData.save(); 
 
      res.status(200).json({ 
        success: true, 
        message: 'Onboarding data updated successfully', 
        data: onboardingData.getFormattedData() 
      }); 
    } else { 
      // Create new onboarding data 
      onboardingData = new Onboarding({ 
        userId, 
        weight, 
        trainingType, 
        trainingSchedule 
      }); 
 
      await onboardingData.save(); 
 
      res.status(201).json({ 
        success: true, 
        message: 'Onboarding data saved successfully', 
        data: onboardingData.getFormattedData() 
      }); 
    } 
 
  } catch (error) { 
    console.error('Error saving onboarding data:', error); 
 
    // Handle duplicate key error (in case unique constraint fails) 
    if (error.code === 11000) { 
      return res.status(400).json({ 
        success: false, 
        message: 'Onboarding data already exists for this user' 
      }); 
    } 
 
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    }); 
  } 
}); 
 
// GET /api/onboarding - Get user's onboarding data 
router.get('/', auth, async (req, res) => { 
  try { 
    const userId = req.user.id; 
    const onboardingData = await Onboarding.findByUserId(userId); 
 
    if (!onboardingData) { 
      return res.status(404).json({ 
        success: false, 
        message: 'Onboarding data not found' 
      }); 
    } 
 
    onboardingData.weight = weight; 
    onboardingData.trainingType = trainingType; 
    onboardingData.trainingSchedule = trainingSchedule; 
 
    await onboardingData.save(); 
 
    res.status(200).json({ 
      success: true, 
      message: 'Onboarding data updated successfully', 
      data: onboardingData.getFormattedData() 
    }); 
 
  } catch (error) { 
    console.error('Error updating onboarding data:', error); 
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    }); 
  } 
}); 
 
// DELETE /api/onboarding - Delete onboarding data 
router.delete('/', auth, async (req, res) => { 
  try { 
    const userId = req.user.id; 
    const onboardingData = await Onboarding.findByUserId(userId); 
 
    if (!onboardingData) { 
      return res.status(404).json({ 
        success: false, 
        message: 'Onboarding data not found' 
      }); 
    } 
 
    await Onboarding.deleteOne({ userId }); 
 
    res.status(200).json({ 
      success: true, 
      message: 'Onboarding data deleted successfully' 
    }); 
 
  } catch (error) { 
    console.error('Error deleting onboarding data:', error); 
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    }); 
  } 
});