import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config({
  path: '.env.production',
});

console.log('SQL_HOST', process.env.SQL_HOST);
console.log('SQL_PORT', process.env.SQL_PORT);
console.log('SQL_USER', process.env.SQL_USER);

import { User } from './entities';
import { Course } from './entities/course.entity';
import { CoursePrice } from './entities/course-price.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.SQL_HOST,
  port: parseInt(process.env.SQL_PORT || '1111', 10),
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Course, CoursePrice],
  migrations: [join(__dirname, '/migrations/*{.ts,.js}')],
  extra: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
});
