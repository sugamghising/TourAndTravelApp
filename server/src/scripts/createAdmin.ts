import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@himalayan.com' });
        if (existingAdmin) {
            console.log('Admin user already exists!');
            console.log('Email: admin@himalayan.com');
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 10);

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@himalayan.com',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@himalayan.com');
        console.log('Password: admin123');
        console.log('\n⚠️  Please change the password after first login!');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
