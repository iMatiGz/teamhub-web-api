import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';

const sequelize = connection;

export const ServerOnBoarding = sequelize.define(
  'serverOnBoarding',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'server_onboarding',
    timestamps: false,
  }
);
