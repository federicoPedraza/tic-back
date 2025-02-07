// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'squid',
  password: 'squid',
  database: 'theenglishcrab',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
