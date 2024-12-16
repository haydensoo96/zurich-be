import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'devguy',
  password: process.env.DB_PASSWORD || 'devguy123',
  database: process.env.DB_NAME || 'motor_insurance_website',
  synchronize: false, // Always use migrations for schema synchronization
  logging: true,
  entities: ['src/product/entities/*.ts'], // Path to entity files
  migrations: ['src/migrations/*.js'], // Path to migration files
});
