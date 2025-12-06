const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'Danielsunny47@gmail.com' });
    
    if (existingAdmin) {
      // Update existing user to admin
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✅ Updated existing user to admin role');
    } else {
      // Create new admin user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Daniel4070@', salt);

      const adminUser = new User({
        fullname: 'Daniel Sunny',
        email: 'Danielsunny47@gmail.com',
        phone: '+234 000 000 0000',
        password: hashedPassword,
        role: 'admin'
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully');
    }

    console.log('\n📧 Email: Danielsunny47@gmail.com');
    console.log('🔑 Password: Daniel4070@');
    console.log('\nYou can now login to the admin dashboard!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdminUser();
