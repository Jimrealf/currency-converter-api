import { pool } from '../config/db';
import { User } from '../models/user';

export async function createUser(user: User): Promise<User> {
    const { email } = user;
    
    const query = `
        INSERT INTO users (email)
        VALUES ($1)
        RETURNING *
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
}