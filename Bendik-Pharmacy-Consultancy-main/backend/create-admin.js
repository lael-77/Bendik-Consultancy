const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createAdmin() {
    let connection;
    
    try {
        // Get credentials from command line arguments or use defaults
        const email = process.argv[2] || 'admin@bendikpharmacy.com';
        const password = process.argv[3] || 'admin123';
        
        console.log('\n🔐 Creating Admin Account\n');
        console.log('─'.repeat(50));
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('─'.repeat(50));
        console.log('\n⚠️  Make sure to change the default password after first login!\n');

        // Connect to database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'diez',
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected to database:', process.env.DB_NAME || 'diez');

        // Check if admin already exists
        const [existing] = await connection.query(
            'SELECT id, email FROM admins WHERE email = ?',
            [email]
        );

        if (existing.length > 0) {
            console.log(`\n⚠️  Admin with email "${email}" already exists!`);
            console.log('   Use a different email or update the existing admin.\n');
            process.exit(1);
        }

        // Hash password
        console.log('🔒 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert admin
        console.log('💾 Saving admin to database...');
        await connection.query(
            'INSERT INTO admins (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );

        console.log('\n✅ Admin account created successfully!');
        console.log('─'.repeat(50));
        console.log('\n📋 Login Credentials:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n🌐 Login URL: http://localhost:3000/LoginForm.html');
        console.log('\n⚠️  Remember to change the password after first login!\n');

    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        if (error.code === 'ER_DUP_ENTRY') {
            console.error('   An admin with this email already exists.');
        }
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

// Usage instructions
if (process.argv[2] === '--help' || process.argv[2] === '-h') {
    console.log('\n📖 Admin Creation Script\n');
    console.log('Usage:');
    console.log('  node create-admin.js [email] [password]');
    console.log('\nExamples:');
    console.log('  node create-admin.js');
    console.log('    → Creates admin with default credentials');
    console.log('    → Email: admin@bendikpharmacy.com');
    console.log('    → Password: admin123');
    console.log('\n  node create-admin.js admin@example.com mypassword123');
    console.log('    → Creates admin with custom credentials');
    console.log('\n⚠️  Default credentials are for development only!');
    console.log('   Always use strong passwords in production.\n');
    process.exit(0);
}

createAdmin();

