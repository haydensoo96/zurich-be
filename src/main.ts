import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppDataSource } from './data-source.js';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envFilePath = join(__dirname, '..', `.env.development`);
if (existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  dotenv.config();
}

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
