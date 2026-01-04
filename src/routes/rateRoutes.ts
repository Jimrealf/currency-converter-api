import { Router } from 'express';
import { getRate } from '../controllers/rateController';

const router = Router();

router.get('/rates', getRate);

export default router;