import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();
const MysqlPort = process.env.MYSQL_PORT
  ? parseInt(process.env.MYSQL_PORT)
  : undefined;
const MysqlDB = process.env.MYSQL_DB as string;
const MysqlUserName = process.env.MYSQL_USERNAME as string;
const MysqlPassword = process.env.MYSQL_PASSWORD;

export const sequelize = new Sequelize(MysqlDB, MysqlUserName, MysqlPassword, {
  dialect: 'mysql',
  host: 'localhost',
  port: MysqlPort,
  logging: false,
});
