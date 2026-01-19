import { Router } from 'express';
import { createFavorite, listFavorites } from '../controllers/favoriteController';

const router = Router();

router.post('/', createFavorite);
router.get('/:user_id', listFavorites);

export default router;
