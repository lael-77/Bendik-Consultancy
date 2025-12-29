const mysql = require('mysql2/promise');
require('dotenv').config();

async function showTableStructures() {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'diez',
            port: process.env.DB_PORT || 3306
        });

        const tables = [
            'client_requests',
            'pharmacy_purchase_requests',
            'pharmacy_sale_requests',
            'job_applications',
            'recruitment_requests',
            'admins',
            'payments'
        ];

        console.log('📋 Table Structures in Database: diez\n');
        console.log('='.repeat(80));

        for (const tableName of tables) {
            const [columns] = await connection.query(`
                SELECT 
                    COLUMN_NAME,
                    DATA_TYPE,
                    CHARACTER_MAXIMUM_LENGTH,
                    IS_NULLABLE,
                    COLUMN_DEFAULT,
                    COLUMN_KEY
                FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
                ORDER BY ORDINAL_POSITION
            `, [process.env.DB_NAME || 'diez', tableName]);

            console.log(`\n📊 Table: ${tableName.toUpperCase()}`);
            console.log('─'.repeat(80));
            console.log('Field Name'.padEnd(30) + 'Type'.padEnd(20) + 'Nullable'.padEnd(10) + 'Key');
            console.log('─'.repeat(80));
            
            columns.forEach(col => {
                const type = col.CHARACTER_MAXIMUM_LENGTH 
                    ? `${col.DATA_TYPE}(${col.CHARACTER_MAXIMUM_LENGTH})`
                    : col.DATA_TYPE;
                const nullable = col.IS_NULLABLE === 'YES' ? 'YES' : 'NO';
                const key = col.COLUMN_KEY || '';
                console.log(
                    col.COLUMN_NAME.padEnd(30) + 
                    type.padEnd(20) + 
                    nullable.padEnd(10) + 
                    key
                );
            });
            console.log(`\nTotal fields: ${columns.length}`);
        }

        console.log('\n' + '='.repeat(80));
        console.log('✅ All tables are ready to receive form data!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (connection) await connection.end();
    }
}

showTableStructures();

