const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findAdminByEmail } = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

async function login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        console.log('🔍 Login attempt for email:', email);
        
        if (!req.db) {
            console.error('❌ Database connection not available');
            return res.status(500).json({ message: 'Database connection error' });
        }
        
        const admin = await findAdminByEmail(req.db, email);
        if (!admin) {
            console.log('❌ Admin not found:', email);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        console.log('✅ Admin found, comparing password...');
        const match = await bcrypt.compare(password, admin.password);
        if (!match) {
            console.log('❌ Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        
        console.log('✅ Password match, generating token...');
        const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
        console.log('✅ Login successful for:', email);
        res.json({ token });
    } catch (err) {
        console.error('❌ Login error:', err);
        console.error('❌ Error stack:', err.stack);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

async function signup(req, res) {
    const { email, password } = req.body;
    console.log('🔍 Signup attempt for email:', email);
    
    if (!email || !password) {
        console.log('❌ Missing email or password');
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        console.log('🔍 Checking if admin exists...');
        const existing = await findAdminByEmail(req.db, email);
        if (existing) {
            console.log('❌ Email already exists:', email);
            return res.status(409).json({ message: 'Email already exists.' });
        }
        
        console.log('🔍 Hashing password...');
        const hashed = await bcrypt.hash(password, 10);
        
        console.log('🔍 Inserting new admin into database...');
        await req.db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashed]);
        
        console.log('✅ Admin created successfully:', email);
        res.status(201).json({ message: 'Admin created successfully.' });
    } catch (err) {
        console.error('❌ Signup error:', err.message);
        console.error('❌ Full error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { login };
module.exports.signup = signup; 