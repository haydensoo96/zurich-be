import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source.js';
import { ProductModule } from './product/product.module.js';
import { MockAuthMiddleware } from './auth/mock-auth.middleware.js';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProductModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MockAuthMiddleware)
      .forRoutes({ path: 'product*', method: RequestMethod.ALL });
  }
}
