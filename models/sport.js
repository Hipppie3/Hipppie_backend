import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Sport = sequelize.define('Sport', {
 id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true,
 },
 name: {
  type: DataTypes.STRING,
  allowNull: false,
 },
});

export default Sport;