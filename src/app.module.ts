import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source.js';
import { ProductModule } from './product/product.module.js';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProductModule],
})
export class AppModule {}
