import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config();
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.SQL_HOST,
  port: parseInt(process.env.SQL_PORT || '3306', 10),
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [join(__dirname, '/entities/*{.ts,.js}')],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  extra: {
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV === 'development',
    },
  },
});
