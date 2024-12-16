import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppDataSource } from './data-source.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  await AppDataSource.initialize();
  console.log('Data Source Initialized');

  // Run migrations
  await AppDataSource.runMigrations();
  console.log('Migrations executed successfully');

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Zurich BE API')
    .setDescription('API documentation for Zurich BE')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
