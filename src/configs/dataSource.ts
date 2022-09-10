import { DataSource } from 'typeorm';
import databaseConfig from './database.config';

export const AppDataSource: DataSource = new DataSource(databaseConfig);
