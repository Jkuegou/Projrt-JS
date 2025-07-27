const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le header Authorization existe et commence par 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Vérifier si le token existe
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no token provided' 
      });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer l'utilisateur depuis la base de données
    const user = await User.findById(decoded.id).select('-password');
    
    // Vérifier si l'utilisateur existe encore
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User no longer exists' 
      });
    }

    // Attacher l'utilisateur à la requête
    req.user = user;
    next();

  } catch (error) {
    console.error('Auth middleware error:', error);
    
    // Différencier les types d'erreurs
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    } else {
      return res.status(500).json({ 
        success: false,
        message: 'Server error during authentication' 
      });
    }
  }
};

module.exports = { protect };