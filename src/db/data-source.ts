import { DataSource } from 'typeorm';
import * as pgtools from 'pgtools';
import { User } from '../models/user';
import { DirectMessage } from '../models/dm';
import { Message } from '../models/messages';

const config = {
  type: 'postgres' as const,
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'Zealous',
  entities: [User, DirectMessage, Message],
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
  console.log("hey the source has been initialised")
  console.log("Data Source has been initialized!");
};
