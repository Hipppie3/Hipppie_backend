import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE, // Database name
  process.env.DB_USERNAME, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Host
    dialect: process.env.DB_DIALECT, // Dialect (e.g., postgres)
    logging: false, // Disable logging; set to console.log for debugging
  }
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

export default sequelize;
