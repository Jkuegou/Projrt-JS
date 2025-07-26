// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

// // Register user
// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create user
//     const user = await User.create({ name, email, password });

//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(400).json({ message: 'Invalid user data' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // PATCH /api/users/profile/personal
// const updatePersonalInfo = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

//     user.gender = req.body.gender;
//     user.age = req.body.age;
//     user.dateOfBirth = req.body.dateOfBirth;

//     await user.save();
//     res.json({ message: 'Informations personnelles mises à jour' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//  // Create user (only allow admin role if request comes from an admin) 
//     const userData = { name, email, password }; 
//     if (role === 'admin') { 
//       // Check if the requester is an admin (for creating admin accounts) 
//       const authHeader = req.headers.authorization; 
//       if (authHeader) { 
//         try { 
//           const token = authHeader.split(' ')[1]; 
//           const decoded = jwt.verify(token, process.env.JWT_SECRET); 
//           const requester = await User.findById(decoded.id); 
//           if (requester && requester.role === 'admin') { 
//             userData.role = 'admin'; 
//           } 
//         } catch (error) { 
//           // Token invalid, default to user role 
//         } 
//       } 
//     } 
 
//     const user = await User.create(userData); 
 
//     if (user) { 
//       res.status(201).json({ 
//         _id: user._id, 
//         name: user.name, 
//         email: user.email, 
//         role: user.role, 
//         token: generateToken(user._id) 
//       }); 
//     } else { 
//       res.status(400).json({ message: 'Invalid user data' }); 
//     } 
//   } catch (error) { 
//     res.status(500).json({ message: error.message }); 
//   } 
// };
// // Login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check for user email
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id)
//       });
//     } else {
//       res.status(401).json({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get user profile
// const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   getUserProfile
// };

// // Update user profile 
// const updateUserProfile = async (req, res) => { 
//   try { 
//     const user = await User.findById(req.user._id); 
     
//     if (user) { 
//       user.name = req.body.name || user.name; 
//       user.email = req.body.email || user.email; 
       
//       if (req.body.password) { 
//         user.password = req.body.password; 
//       } 
       
//       const updatedUser = await user.save(); 
       
//       res.json({ 
//         _id: updatedUser._id, 
//         name: updatedUser.name, 
//         email: updatedUser.email, 
//         role: updatedUser.role 
//       }); 
//     } else { 
//       res.status(404).json({ message: 'User not found' }); 
//     } 
//   } catch (error) { 
//     res.status(500).json({ message: error.message }); 
//   } 
// }; 
 
// module.exports = { 
//   registerUser, 
//   loginUser, 
//   getUserProfile, 
//   updateUserProfile 
// }; 
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// 🔐 Génération du token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// 🟢 Enregistrement d’un utilisateur (admin inclus)
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utilisateur déjà enregistré' });
    }

    // 🧠 Initialisation des données à enregistrer
    const userData = { name, email, password, role: 'user' };

    // Si le rôle demandé est admin, vérifier que le créateur est aussi admin
    if (role === 'admin') {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        try {
          const token = authHeader.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const requester = await User.findById(decoded.id);

          if (requester && requester.role === 'admin') {
            userData.role = 'admin';
          }
        } catch (error) {
          // Si erreur dans le token, on garde "user"
        }
      }
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Données invalides' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔐 Connexion utilisateur
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📄 Profil utilisateur
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ Mise à jour du profil
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👤 Mise à jour des infos personnelles (âge, sexe...)
const updatePersonalInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    user.gender = req.body.gender;
    user.age = req.body.age;
    user.dateOfBirth = req.body.dateOfBirth;

    await user.save();
    res.json({ message: 'Informations personnelles mises à jour' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updatePersonalInfo
};
