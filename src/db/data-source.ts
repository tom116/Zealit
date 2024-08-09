import { DataSource } from 'typeorm';
import * as pgtools from 'pgtools';
import { User } from '../models/user';

const config = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'Zealous',
  entities: [User],
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(config);

export const initializeDataSource = async () => {
  try {
    await pgtools.createdb({
      user: config.username,
      password: config.password,
      port: config.port,
      host: config.host,
    }, config.database);
    console.log('Database created or already exists');
  } catch (err: any) {
    if (err.name !== 'duplicate_database') {
      console.error('Error creating database', err);
      throw err;
    }
  }

  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
};