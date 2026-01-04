import axios from 'axios';

export async function getExchangeRate(base: string, target: string): Promise<number> {
    const url = `${process.env.BASE_URL}/${process.env.EXCHANGE_RATE_API_KEY}/pair/${base}/${target}`;
    const response = await axios.get(url);
    if (response.data && response.data.conversion_rate) {
        return response.data.conversion_rate;
    }
    throw new Error('Failed to retrieve exchange rate');
}

