// const express = require('express');
// const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
// const { protect } = require('../middleware/auth');
// const User = require('../models/User');

// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', protect, getUserProfile);

// const {
//   updatePersonalInfo,
//   updateWorkoutSchedule,
//   updateMeasurements,
//   updateFitnessGoals,
//   completeOnboarding
// } = require('../controllers/userController');

// router.patch('/profile/personal', protect, updatePersonalInfo);
// router.patch('/profile/workout-schedule', protect, updateWorkoutSchedule);
// router.patch('/profile/measurements', protect, updateMeasurements);
// router.patch('/profile/fitness-goals', protect, updateFitnessGoals);
// router.patch('/profile/complete-onboarding', protect, completeOnboarding);

// const User = require('../models/User');

// // PUT /api/users/settings
// router.put('/settings', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

//     user.preferences = {
//       ...user.preferences,
//       ...req.body,
//     };

//     await user.save();

//     res.status(200).json({ message: 'Paramètres mis à jour avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// });
// // GET /api/users/settings
// router.get('/settings', protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('preferences');

//     if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

//     res.status(200).json(user.preferences);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des préférences :', error.message);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// });

// // DELETE /api/users/delete
// router.delete('/delete', protect, async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user.id);
//     res.status(200).json({ message: 'Compte supprimé avec succès' });
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur lors de la suppression du compte' });
//   }
// });



// module.exports = router;
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const {
  updatePersonalInfo,
  updateWorkoutSchedule,
  updateMeasurements,
  updateFitnessGoals,
  completeOnboarding
} = require('../controllers/userController'); // Garde un seul import correct ici
const User = require('../models/User');

// Routes d'authentification
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

// Routes profil et onboarding
router.patch('/profile/personal', protect, updatePersonalInfo);
router.patch('/profile/workout-schedule', protect, updateWorkoutSchedule);
router.patch('/profile/measurements', protect, updateMeasurements);
router.patch('/profile/fitness-goals', protect, updateFitnessGoals);
router.patch('/profile/complete-onboarding', protect, completeOnboarding);

// Routes paramètres utilisateur
router.put('/settings', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.preferences = {
      ...user.preferences,
      ...req.body,
    };
    await user.save();

    res.status(200).json({ message: 'Paramètres mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/settings', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    res.status(200).json(user.preferences);
  } catch (error) {
    console.error('Erreur lors de la récupération des préférences :', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Suppression du compte
router.delete('/delete', protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du compte' });
  }
});

module.exports = router;
