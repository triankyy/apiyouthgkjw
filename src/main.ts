import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
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
  const configSwagger: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
    .setTitle('M2SMAPI')
    .setDescription('Documentation of API M2SM')
    .setLicense('Developed By Kyy', 'https://instagram.com/kyy.owo')
    .setVersion('Alpha 1')
    .addBearerAuth()
    .build();
  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  };
  const doc: OpenAPIObject = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, doc, configCustomSwagger);
  await app.listen(process.env.PORT, '0.0.0.0');
  Logger.log(process.env.PORT, 'Port');
}

bootstrap();
