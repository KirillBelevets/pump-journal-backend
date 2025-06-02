import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://pump-journal-frontend.vercel.app',
    ],
    credentials: true,
  });
  await app.init();
}
bootstrap();

export default server;
