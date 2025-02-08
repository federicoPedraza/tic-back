/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { HttpExceptionFilter } from './common/exception.filter';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("NestJS - The English Crab - API")
    .setDescription("The English Crab API Documentation")
    .setVersion("1.0")
    .addTag("users, courses")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());

  const configService = app.get(ConfigService);

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: 'Too many requests, please try again after 15 minutes'
    })
  );

  app.enableCors({
    origin: configService.get<string>("CORS_ORIGIN") || "",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  })

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(configService.get<number>("PORT") || 3000);
}
bootstrap();
