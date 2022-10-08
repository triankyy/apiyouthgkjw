import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './api/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('html');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(process.env.PORT || 5000, '0.0.0.0');
  Logger.log(process.env.PORT, 'Port');
}

bootstrap();
