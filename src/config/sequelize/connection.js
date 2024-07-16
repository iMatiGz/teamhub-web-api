import { Sequelize } from 'sequelize';
import 'dotenv/config';

const HOST = process.env.DATABASE_MYSQL_HOST;
const USER = process.env.DATABASE_MYSQL_USER;
const PASSWORD = process.env.DATABASE_MYSQL_PASSWORD;
const DATABASE = process.env.DATABASE_MYSQL_NAME;
const PORT = process.env.DATABASE_MYSQL_PORT;

export const connection = new Sequelize(`mysql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`, {
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false,
  // logging: console.log,
});
