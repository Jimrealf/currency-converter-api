import axios from 'axios';
import redisClient from '../config/redis';

export async function getExchangeRate(base: string, target: string): Promise<number> {

    const cacheKey = `rate:${base}:${target}`;
    const cachedRate = await redisClient.get(cacheKey);

    if (cachedRate) {
        console.log(`Cache Hit! Returning stored rate for ${base}->${target}`);
        return parseFloat(cachedRate);
    }

    console.log(`Cache Miss! Fetching rate for ${base}->${target}`);


    const url = `${process.env.BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${base}/${target}`;
    const response = await axios.get(url);

    if (response.data && response.data.conversion_rate) {
        const rate = response.data.conversion_rate;

        await redisClient.set(cacheKey, rate.toString(), {
            EX: 3600 
        });

        console.log(`Rate fetched and cached for ${base}->${target}`);
        return rate;
    }
    throw new Error('Failed to retrieve exchange rate');
}

