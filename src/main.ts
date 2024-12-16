import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppDataSource } from './data-source.js';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
  await app.listen(3000);
}
bootstrap();
