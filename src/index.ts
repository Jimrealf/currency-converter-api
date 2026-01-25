import express from 'express';
import dotenv from 'dotenv';
import rateRoutes from './routes/rateRoutes';
import userRoutes from './routes/userRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import './config/redis';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', rateRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
