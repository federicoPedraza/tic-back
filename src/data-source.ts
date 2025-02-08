import { DataSource } from 'typeorm';
import { join } from 'path';
import { config } from 'dotenv';

config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

import { User } from './entities';
import { Course } from './entities/course.entity';
import { CoursePrice } from './entities/course-price.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.SQL_HOST,
  port: parseInt(process.env.SQL_PORT || '3306', 10),
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
