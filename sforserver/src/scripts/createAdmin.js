require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDB } = require('../config/db');
const { User } = require('../models');

const createAdmin = async () => {
  await connectDB();

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    const existing = await User.findOne({ where: { email: adminEmail } });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(adminPassword, 10);

    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: hashed,
      role: 'ADMIN',
      isActive: true,
    });

    console.log('Created admin:', admin.email);
    console.log('Password:', adminPassword);
    process.exit(0);
  } catch (err) {
    console.error('Failed to create admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
