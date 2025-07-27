const Onboarding = require('../models/Onboarding');

exports.saveOnboardingData = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;

  try {
    let onboarding = await Onboarding.findOne({ user: userId });

    if (onboarding) {
      onboarding = await Onboarding.findOneAndUpdate({ user: userId }, data, { new: true });
    } else {
      onboarding = await Onboarding.create({ ...data, user: userId });
    }

    res.status(200).json(onboarding);
  } catch (error) {
    res.status(500).json({ message: 'Erreur de sauvegarde', error });
  }
};

exports.getOnboardingData = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ user: req.user._id });

    if (!onboarding) return res.status(404).json({ message: 'Aucune donnée trouvée' });

    res.json(onboarding);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.completeOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOneAndUpdate(
      { user: req.user._id },
      { isCompleted: true },
      { new: true }
    );

    if (!onboarding) return res.status(404).json({ message: 'Onboarding non trouvé' });

    res.json({ message: 'Onboarding terminé', onboarding });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
