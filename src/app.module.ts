import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './config/jwt.strategy';
import { Course } from './entities/course.entity';
import { CourseModule } from './courses/course.module';
import { CoursePriceModule } from './courses/course-prices/course-price.module';
import { CoursePrice } from './entities/course-price.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { CourseParticipantModule } from './courses/course-participants/course-participant.module';
import { CourseParticipant } from './entities/course-participant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env' : '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('SQL_HOST'),
        port: configService.get<number>('SQL_PORT'),
        username: configService.get<string>('SQL_USER'),
        password: configService.get<string>('SQL_PASSWORD'),
        database: configService.get<string>('SQL_DATABASE'),
        synchronize: false,
        migrations: [join(__dirname, './migrations/*{.ts,.js}')],
        logging: false,
        entities: [User, Course, CoursePrice, CourseParticipant],
        cli: {
          migrationsDir: 'src/migrations',
      }
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    CourseModule,
    CoursePriceModule,
    CourseParticipantModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
