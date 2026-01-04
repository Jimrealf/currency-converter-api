import { Request, Response } from 'express';
import { getExchangeRate } from '../services/exchangeRate';

export async function getRate(req: Request, res: Response) {
    try {
        const { base, target } = req.query;

        if (!base || !target) {
            return res.status(400).json({ error: "Please provide base and target currencies" });
        }

        const rate = await getExchangeRate(base as string, target as string);

        return res.status(200).json({ rate });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve exchange rate' });
    }
}