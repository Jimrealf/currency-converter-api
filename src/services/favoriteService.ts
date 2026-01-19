import { pool } from '../config/db';
import { Favorite } from '../models/favorite';

export async function addFavorite(userId: number, base: string, target: string): Promise<Favorite> {
    try {
        const query = `
            INSERT INTO favorites (user_id, base_currency, target_currency)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [userId, base, target]);
        return result.rows[0];
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
}

export async function getFavorites(userId: number): Promise<Favorite[]> {
    try {
        const query = `
            SELECT * FROM favorites WHERE user_id = $1 ORDER BY created_at DESC
        `;
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Error getting favorites:', error);
        throw error;
    }
}
