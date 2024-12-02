import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Team = sequelize.define('Team', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sportId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: 'Sports',
    key: 'id',
  },
},
});



export default Team;
