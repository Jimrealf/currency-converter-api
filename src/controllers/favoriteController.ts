import { Request, Response } from 'express';
import { addFavorite, getFavorites } from '../services/favoriteService';

export async function createFavorite(req: Request, res: Response) {
    try {
        const { user_id, base, target } = req.body;

        if (!user_id || !base || !target) {
            return res.status(400).json({ error: 'user_id, base, and target are required' });
        }

        const favorite = await addFavorite(user_id, base, target);
        return res.status(201).json({ message: 'Favorite created successfully', favorite });
        
    } catch (error: any) {
        console.error(error);
        if (error.code === '23503') {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(500).json({ error: 'Failed to create favorite' });
    }
}

export async function listFavorites(req: Request, res: Response) {
    try {
        const user_id = Number(req.params.user_id);

        if (!user_id || isNaN(user_id)) {
            return res.status(400).json({ error: 'Valid user_id is required' });
        }

        const favorites = await getFavorites(user_id);
        return res.status(200).json({ favorites });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve favorites' });
    }
}
