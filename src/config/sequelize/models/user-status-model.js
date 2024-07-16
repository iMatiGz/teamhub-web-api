import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';

const sequelize = connection;

export const UserStatus = sequelize.define(
  'userStatus',
  {
    status_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'user_status',
    timestamps: false,
  }
);
