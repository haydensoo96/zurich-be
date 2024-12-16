import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const productCode = '1000';
      const location = 'Test Location';
      const result = {
        id: 1,
        productCode,
        description: 'Test Product',
        location,
        price: 100,
      };

      jest
        .spyOn(productRepository, 'findOne')
        .mockImplementation(async () => result);

      expect(await productService.findOne(productCode, location)).toBe(result);
    });

    it('should throw a NotFoundException if product is not found', async () => {
      const productCode = '1000';
      const location = 'Test Location';

      jest
        .spyOn(productRepository, 'findOne')
        .mockImplementation(async () => null);

      await expect(
        productService.findOne(productCode, location),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneUpdate', () => {
    it('should return a product', async () => {
      const productCode = '1000';
      const result = {
        id: 1,
        productCode,
        description: 'Test Product',
        location: 'Test Location',
        price: 100,
      };

      jest
        .spyOn(productRepository, 'findOne')
        .mockImplementation(async () => result);

      expect(await productService.findOneUpdate(productCode)).toBe(result);
    });

    it('should throw a NotFoundException if product is not found', async () => {
      const productCode = '1000';

      jest
        .spyOn(productRepository, 'findOne')
        .mockImplementation(async () => null);

      await expect(productService.findOneUpdate(productCode)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
