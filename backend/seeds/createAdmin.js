const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs'); 
const User = require('../models/User'); 
 
const createAdmin = async () => { 
  try { 
    await mongoose.connect('mongodb://localhost:27017/fitness-auth'); 
     
    const adminExists = await User.findOne({ role: 'admin' }); 
    if (adminExists) { 
      console.log('Admin already exists'); 
      return; 
    } 
 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash('admin123', salt); 
 
    const admin = await User.create({ 
      name: 'System Admin', 
      email: 'admin@example.com', 
      password: 'adminpass', 
      role: 'admin' 
    }); 
 
    console.log('Admin created:', admin.email); 
  } catch (error) { 
    console.error('Error:', error); 
  } finally { 
    mongoose.connection.close(); 
  } 
}; 
 
createAdmin();