import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import playerRoutes from './routes/playerRoutes.js';
import teamRoutes from './routes/teamRoutes.js';

// Load enviornment from variables
dotenv.config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only the frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies (if needed)
};

const PORT = 5005;

app.use(express.json());
app.use(cors(corsOptions));

app.use('/players', playerRoutes)
app.use('/teams', teamRoutes)

app.get('/', (req, res) => {
 res.send("Server is running with ES Module")
});

app.listen(PORT, ()=> console.log(`Server is running on PORT: ${PORT}`));

// Example: Sync models (optional)
(async () => {
  try {
    await sequelize.sync(); // Use { force: true } for development reset
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing the database:', error.message);
  }
})();