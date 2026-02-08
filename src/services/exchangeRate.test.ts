import { getExchangeRate } from './exchangeRate';
import redisClient from '../config/redis';
import axios from 'axios';

jest.mock('../config/redis', () => ({
    get: jest.fn(),
    set: jest.fn(),
    isOpen: true,
    connect: jest.fn()
}));

jest.mock('axios');

const mockedRedis = redisClient as jest.Mocked<typeof redisClient>;
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Exchange Rate Service', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return cached rate if available (Cache Hit)', async () => {
      
        (mockedRedis.get as jest.Mock).mockResolvedValue('1.5');
        
        const rate = await getExchangeRate('USD', 'EUR');
       
        expect(rate).toBe(1.5);
        expect(mockedRedis.get).toHaveBeenCalledWith('rate:USD:EUR');
        expect(mockedAxios.get).not.toHaveBeenCalled(); 
    });

    it('should fetch from API if cache is empty (Cache Miss)', async () => {

        (mockedRedis.get as jest.Mock).mockResolvedValue(null);
        

        mockedAxios.get.mockResolvedValue({
            data: { conversion_rate: 0.85 }
        });

        const rate = await getExchangeRate('GBP', 'USD');

        expect(rate).toBe(0.85);
        expect(mockedAxios.get).toHaveBeenCalled(); 

        expect(mockedRedis.set).toHaveBeenCalledWith(
            'rate:GBP:USD', 
            '0.85', 
            expect.objectContaining({ EX: 3600 })
        );
    });

    it('should throw error if API fails', async () => {
       
        (mockedRedis.get as jest.Mock).mockResolvedValue(null);
        mockedAxios.get.mockRejectedValue(new Error('API Down'));

        await expect(getExchangeRate('USD', 'JPY')).rejects.toThrow();
    });
});