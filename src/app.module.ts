import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProductModule],
})
export class AppModule {}
