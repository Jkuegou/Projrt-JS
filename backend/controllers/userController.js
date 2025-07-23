const User = require('../models/User');

// Étape 1 : infos personnelles
const updatePersonalInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.gender = req.body.gender;
    user.age = req.body.age;
    user.dateOfBirth = req.body.dateOfBirth;

    await user.save();
    res.json({ message: 'Infos personnelles enregistrées' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Étape 2 : planning d'entraînement
const updateWorkoutSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.workoutDays = req.body.workoutDays;
    user.workoutTime = req.body.workoutTime;
    user.sessionsPerWeek = req.body.sessionsPerWeek;

    await user.save();
    res.json({ message: 'Planning d’entraînement enregistré' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Étape 3 : mensurations
const updateMeasurements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const heightInMeters = height / 100;
    const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

    let category = '';
    if (bmi < 18.5) category = 'Poids insuffisant';
    else if (bmi < 25) category = 'Poids normal';
    else if (bmi < 30) category = 'Surpoids';
    else category = 'Obésité';

    user.height = height;
    user.weight = weight;
    user.bmi = bmi;
    user.bmiCategory = category;

    await user.save();
    res.json({ message: 'Mensurations enregistrées', bmi, category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Étape 4 : objectifs fitness
const updateFitnessGoals = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    const { targetBodyParts } = req.body;

    const goalMapping = {
      'Bras': ['Développer la force des bras', 'Tonifier les muscles des bras'],
      'Poitrine': ['Renforcer les pectoraux', 'Développer la masse musculaire du torse'],
      'Dos': ['Améliorer la posture', 'Renforcer les muscles dorsaux'],
      'Épaules': ['Élargir les épaules', 'Renforcer la ceinture scapulaire'],
      'Abdominaux': ['Obtenir des abdos visibles', 'Renforcer le core'],
      'Jambes': ['Développer la puissance des jambes', 'Tonifier les cuisses et mollets'],
      'Fessiers': ['Tonifier et galber les fessiers', 'Améliorer la force des hanches'],
      'Cardio': ['Améliorer l\'endurance cardiovasculaire', 'Brûler les graisses']
    };

    const fitnessGoals = [];
    targetBodyParts.forEach(part => {
      if (goalMapping[part]) {
        fitnessGoals.push(...goalMapping[part]);
      }
    });

    user.targetBodyParts = targetBodyParts;
    user.fitnessGoals = fitnessGoals;

    await user.save();
    res.json({ message: 'Objectifs enregistrés', fitnessGoals });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Finaliser l'onboarding
const completeOnboarding = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.onboardingCompleted = true;
    user.onboardingCompletedAt = new Date();

    await user.save();
    res.json({ message: 'Profil complété avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updatePersonalInfo,
  updateWorkoutSchedule,
  updateMeasurements,
  updateFitnessGoals,
  completeOnboarding,
};
