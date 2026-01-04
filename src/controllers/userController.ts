import { Request, Response } from 'express';
import { createUser } from '../services/userService';

export async function registerUser(req: Request, res: Response) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        };

        const user = await createUser(email);
        return res.status(200).json({ message: 'User registered successfully', user });
        
    } catch (error) {
        console.error(error);
        if (error && (error as any).code === '23505') {
            return res.status(409).json({ error: 'User already exists.' });
        }
        return res.status(500).json({ error: 'Failed to register user' });
    }
}