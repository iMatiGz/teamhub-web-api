import { DataTypes } from 'sequelize';
import { connection } from '../connection.js';
import { User } from './user-model.js';

const sequelize = connection;

export const UserFriendship = sequelize.define(
  'userFriendship',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    friend_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: User,
        key: 'user_id',
      },
    },
  },
  {
    tableName: 'user_friendships',
    timestamps: false,
  }
);
