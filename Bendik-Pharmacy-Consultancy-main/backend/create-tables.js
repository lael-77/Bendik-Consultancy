const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAllTables() {
    let connection;
    
    try {
        // Connect to MySQL database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'diez',
            port: process.env.DB_PORT || 3306
        });

        console.log('✅ Connected to MySQL database');
        console.log(`📊 Using database: ${process.env.DB_NAME || 'diez'}\n`);

        // 1. Create admins table
        console.log('Creating admins table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ admins table created\n');

        // 2. Create client_requests table
        console.log('Creating client_requests table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS client_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                organizationName VARCHAR(255) NOT NULL,
                businessType VARCHAR(100) NOT NULL,
                nationalId VARCHAR(100) NOT NULL,
                tinNumber VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                phoneNumber VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                contactMode VARCHAR(50) NOT NULL,
                services TEXT,
                otherService VARCHAR(255),
                urgency VARCHAR(50) NOT NULL,
                specificDates VARCHAR(255),
                description TEXT NOT NULL,
                PreferedInsurance TEXT NOT NULL,
                requireQuotation VARCHAR(10) NOT NULL,
                paymentMode VARCHAR(50) NOT NULL,
                invoicingName VARCHAR(255),
                declaration VARCHAR(10) NOT NULL,
                signature VARCHAR(255),
                isDeleted BOOLEAN DEFAULT FALSE,
                deletedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ client_requests table created\n');

        // 3. Create pharmacy_purchase_requests table
        console.log('Creating pharmacy_purchase_requests table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS pharmacy_purchase_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                buyerName VARCHAR(255) NOT NULL,
                phoneNumber VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                contactMethod VARCHAR(50) NOT NULL,
                nationalId VARCHAR(100),
                tinNumber VARCHAR(100),
                pharmacyType TEXT,
                otherType VARCHAR(255),
                preferredLocation VARCHAR(255),
                operatingArea VARCHAR(50),
                businessStatus VARCHAR(50),
                ownershipType VARCHAR(50),
                minRevenue VARCHAR(100),
                budgetRange VARCHAR(100),
                budgetFlexible VARCHAR(20),
                timeline VARCHAR(50),
                insurancePartners VARCHAR(255),
                supportServices TEXT,
                otherServices VARCHAR(255),
                additionalInfo TEXT,
                clientSignature VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                isDeleted BOOLEAN DEFAULT FALSE,
                deletedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ pharmacy_purchase_requests table created\n');

        // 4. Create pharmacy_sale_requests table
        console.log('Creating pharmacy_sale_requests table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS pharmacy_sale_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                ownerName VARCHAR(255) NOT NULL,
                phoneNumber VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                contactMode VARCHAR(50),
                pharmacyName VARCHAR(255),
                businessType VARCHAR(50),
                location VARCHAR(255),
                ownershipType VARCHAR(50),
                premisesSize VARCHAR(50),
                licenseStatus VARCHAR(50),
                years VARCHAR(50),
                salesRange VARCHAR(100),
                insurancePartners VARCHAR(255),
                staffCount VARCHAR(50),
                inventoryValue VARCHAR(100),
                equipmentIncluded VARCHAR(50),
                reason VARCHAR(255),
                debts VARCHAR(10),
                debtAmount VARCHAR(100),
                price VARCHAR(100),
                negotiable VARCHAR(10),
                timeline VARCHAR(50),
                valuationService VARCHAR(10),
                additionalInfo TEXT,
                documents TEXT,
                date DATE NOT NULL,
                signature VARCHAR(255) DEFAULT 'Digital Signature',
                isDeleted BOOLEAN DEFAULT FALSE,
                deletedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ pharmacy_sale_requests table created\n');

        // 5. Create job_applications table
        console.log('Creating job_applications table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS job_applications (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullName VARCHAR(255) NOT NULL,
                dob DATE,
                nationality VARCHAR(100),
                idNumber VARCHAR(100),
                npcNumber VARCHAR(100),
                phoneNumber VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                contactMode TEXT,
                position VARCHAR(100),
                otherPosition VARCHAR(255),
                licenseStatus VARCHAR(50),
                qualification VARCHAR(255),
                institution VARCHAR(255),
                graduationYear VARCHAR(10),
                experience VARCHAR(50),
                pharmacyType TEXT,
                schedule VARCHAR(50),
                locationPref VARCHAR(255),
                relocate VARCHAR(10),
                salaryFrom VARCHAR(100),
                salaryTo VARCHAR(100),
                startDate DATE,
                skills TEXT,
                otherSkills TEXT,
                employer1 VARCHAR(255),
                position1 VARCHAR(255),
                duration1 VARCHAR(100),
                reason1 VARCHAR(255),
                refName1 VARCHAR(255),
                refRelation1 VARCHAR(100),
                refPhone1 VARCHAR(50),
                signature VARCHAR(255),
                signatureDate DATE NOT NULL,
                isDeleted BOOLEAN DEFAULT FALSE,
                deletedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ job_applications table created\n');

        // 6. Create recruitment_requests table
        console.log('Creating recruitment_requests table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS recruitment_requests (
                id INT AUTO_INCREMENT PRIMARY KEY,
                pharmacyName VARCHAR(255) NOT NULL,
                contactPerson VARCHAR(255) NOT NULL,
                phoneNumber VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                type TEXT,
                typeOther VARCHAR(255),
                branches INT,
                staffCount INT,
                position VARCHAR(100),
                positionsAvailable INT,
                employmentType VARCHAR(50),
                startDate DATE,
                workingHours VARCHAR(255),
                salaryFrom VARCHAR(100),
                salaryTo VARCHAR(100),
                housingTransport VARCHAR(10),
                bonus VARCHAR(10),
                bonusDetails VARCHAR(255),
                qualification TEXT,
                license TEXT,
                experience VARCHAR(50),
                language TEXT,
                otherLanguage VARCHAR(100),
                additionalSkills TEXT,
                responsibility1 VARCHAR(255),
                responsibility2 VARCHAR(255),
                responsibility3 VARCHAR(255),
                responsibility4 VARCHAR(255),
                responsibility5 VARCHAR(255),
                reportingLine VARCHAR(255),
                systemUsed VARCHAR(255),
                teamStructure VARCHAR(255),
                training VARCHAR(10),
                challenges TEXT,
                support TEXT,
                signatureDate DATE NOT NULL,
                signature VARCHAR(255) DEFAULT 'Digital Signature',
                isDeleted BOOLEAN DEFAULT FALSE,
                deletedAt TIMESTAMP NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ recruitment_requests table created\n');

        // 7. Create payments table
        console.log('Creating payments table...');
        await connection.query(`
            CREATE TABLE IF NOT EXISTS payments (
                id INT AUTO_INCREMENT PRIMARY KEY,
                method VARCHAR(50) NOT NULL,
                amount DECIMAL(18,2) NOT NULL,
                currency VARCHAR(10) NOT NULL,
                phone VARCHAR(50),
                cardRef VARCHAR(255),
                status VARCHAR(50) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        `);
        console.log('✅ payments table created\n');

        // Show table summary
        console.log('📊 Fetching table information...\n');
        const [tables] = await connection.query(`
            SELECT TABLE_NAME, TABLE_ROWS 
            FROM information_schema.TABLES 
            WHERE TABLE_SCHEMA = ? 
            ORDER BY TABLE_NAME
        `, [process.env.DB_NAME || 'diez']);

        console.log('✅ All tables created successfully!\n');
        console.log('📋 Tables in database:');
        console.log('─'.repeat(50));
        tables.forEach(table => {
            console.log(`  ✓ ${table.TABLE_NAME.padEnd(35)} (${table.TABLE_ROWS} rows)`);
        });
        console.log('─'.repeat(50));
        console.log(`\n✅ Total: ${tables.length} tables ready for use!\n`);

    } catch (error) {
        console.error('❌ Error creating tables:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
            console.log('🔌 Database connection closed');
        }
    }
}

createAllTables();

