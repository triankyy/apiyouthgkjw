import { DataSource } from 'typeorm';
import databaseConfig from './configs/database.config';

export const AppDataSource: DataSource = new DataSource(databaseConfig);
