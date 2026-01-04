import express from 'express';
import dotenv from 'dotenv';
import rateRoutes from './routes/rateRoutes';
dotenv.config();

const app = express();

app.use('/api', rateRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
