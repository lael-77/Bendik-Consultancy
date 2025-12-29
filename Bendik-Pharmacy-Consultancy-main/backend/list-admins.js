const mysql = require('mysql2/promise');
require('dotenv').config();

async function listAdmins() {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'diez',
            port: process.env.DB_PORT || 3306
        });

        const [admins] = await connection.query(
            'SELECT id, email, created_at FROM admins ORDER BY created_at DESC'
        );

        console.log('\n📋 Admin Accounts in Database\n');
        console.log('─'.repeat(60));
        
        if (admins.length === 0) {
            console.log('   No admin accounts found.');
        } else {
            admins.forEach((admin, index) => {
                console.log(`\n${index + 1}. Admin ID: ${admin.id}`);
                console.log(`   Email: ${admin.email}`);
                console.log(`   Created: ${new Date(admin.created_at).toLocaleString()}`);
            });
        }
        
        console.log('\n' + '─'.repeat(60));
        console.log(`\n✅ Total: ${admins.length} admin account(s)\n`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (connection) await connection.end();
    }
}

listAdmins();

