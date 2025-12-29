const mysql = require('mysql2/promise');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

async function testLogin() {
    let connection;
    
    try {
        console.log('🔍 Testing login functionality...\n');
        
        // Connect to database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'diez',
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected to database:', process.env.DB_NAME || 'diez');

        // Test query
        const email = 'admin@bendikpharmacy.com';
        const password = 'admin123';
        
        console.log(`\n🔍 Looking for admin: ${email}`);
        const [admins] = await connection.query(
            'SELECT * FROM admins WHERE email = ?',
            [email]
        );

        if (admins.length === 0) {
            console.log('❌ Admin not found in database!');
            return;
        }

        const admin = admins[0];
        console.log('✅ Admin found:', admin.email);
        console.log('   ID:', admin.id);
        console.log('   Password hash:', admin.password.substring(0, 20) + '...');

        // Test password comparison
        console.log('\n🔒 Testing password comparison...');
        const match = await bcryptjs.compare(password, admin.password);
        
        if (match) {
            console.log('✅ Password matches!');
        } else {
            console.log('❌ Password does not match!');
            console.log('   This might be because the password was hashed with bcrypt instead of bcryptjs');
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('   Stack:', error.stack);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

testLogin();

