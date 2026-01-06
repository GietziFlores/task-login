import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';

const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
connectDB();

// Middleware de manejo de errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});