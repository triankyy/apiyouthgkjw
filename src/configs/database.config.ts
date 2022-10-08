import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  // host: process.env.PG_HOST,
  // port: Number(process.env.PG_PORT),
  // username: process.env.PG_USERNAME,
  // password: process.env.PG_PASSWORD,
  // database: process.env.PG_DATABASE,
  migrationsTableName: 'migrations',
  entities: ['dist/api/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  logging: true,
  synchronize: true,
};

export default databaseConfig;
