import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';

const sequelize = connection;

export const Channel = sequelize.define(
  'channel',
  {
    channel_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    server_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'channels',
    timestamps: false,
  }
);
