import { pool } from '../config/db';

const createTables = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS favorites CASCADE');
        await pool.query('DROP TABLE IF EXISTS users CASCADE');
        await pool.query('DROP TABLE IF EXISTS rates CASCADE');

        console.log('🏗️  Creating new tables...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS rates (
                id SERIAL PRIMARY KEY,
                base_currency VARCHAR(3) NOT NULL,
                target_currency VARCHAR(3) NOT NULL,
                rate DECIMAL(10, 4) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS favorites (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                base_currency VARCHAR(3) NOT NULL,
                target_currency VARCHAR(3) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            `)
        
        console.log('Tables created successfully');

    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;

    } finally {
        pool.end();
    }
}

createTables();