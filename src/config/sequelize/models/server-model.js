import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';

const sequelize = connection;

export const Server = sequelize.define(
  'server',
  {
    server_id: {
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
      type: DataTypes.TEXT,
    },
    icon: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'servers',
    timestamps: false,
  }
);
