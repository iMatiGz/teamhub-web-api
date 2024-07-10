import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';

const sequelize = connection;

export const Message = sequelize.define(
  'message',
  {
    message_id: {
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
    channel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'messages',
    timestamps: false,
  }
);
