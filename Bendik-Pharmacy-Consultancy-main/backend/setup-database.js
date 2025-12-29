const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
    let connection;
    
    try {
        // Connect to MySQL server (without specifying database)
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected to MySQL server');

        // Create database if it doesn't exist
        const dbName = process.env.DB_NAME || 'bendik_pharmacy_db';
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
        console.log(`✅ Database '${dbName}' created or already exists`);

        // Switch to the database
        await connection.query(`USE \`${dbName}\``);
        console.log(`✅ Using database '${dbName}'`);

        console.log('\n✅ Database setup complete!');
        console.log(`📊 Database Name: ${dbName}`);
        console.log(`🔌 Host: ${process.env.DB_HOST || 'localhost'}`);
        console.log(`👤 User: ${process.env.DB_USER || 'root'}`);
        
    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

setupDatabase();

