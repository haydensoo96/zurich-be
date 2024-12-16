import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { AppDataSource } from './data-source.js';

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
