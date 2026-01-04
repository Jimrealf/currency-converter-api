import express from 'express';
import dotenv from 'dotenv';
import rateRoutes from './routes/rateRoutes';
import userRoutes from './routes/userRoutes';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', rateRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
