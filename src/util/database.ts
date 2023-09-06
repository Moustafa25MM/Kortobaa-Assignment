import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('kortobaa', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});
