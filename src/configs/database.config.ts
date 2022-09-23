import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrationsTableName: 'migrations',
  entities: ['dist/api/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: true,
};

export default databaseConfig;
