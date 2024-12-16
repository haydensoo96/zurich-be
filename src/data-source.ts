import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME || 'devguy',
  password: process.env.DB_PASSWORD || 'devguy123',
  database: process.env.DB_NAME || 'motor_insurance_website',
  synchronize: false, // Always use migrations for schema synchronization
  logging: true,
  entities: [__dirname + '/product/entities/*.entity.js'],
  migrations: [__dirname + '/migrations/*.js'], // Path to migration files
});
