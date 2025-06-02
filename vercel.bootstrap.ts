import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import type { Express } from 'express';

export async function bootstrap(): Promise<Express> {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://pump-journal-frontend.vercel.app',
      'http://localhost:3001',
    ],
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  return app.getHttpAdapter().getInstance() as Express;
}
