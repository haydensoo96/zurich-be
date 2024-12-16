import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './entities/product.entity';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result: Product = {
        id: 1,
        productCode: '1000',
        description: 'Test Product',
        location: 'Test Location',
        price: 100,
      };
      jest
        .spyOn(productService, 'findOne')
        .mockImplementation(async () => result);

      expect(
        await productController.findOne({
          productCode: '1000',
          location: 'Test Location',
        }),
      ).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto: CreateProductDto = {
        productCode: '1000',
        description: 'Test Product',
        location: 'Test Location',
        price: 100,
      };
      const result: Product = { id: 1, ...createProductDto };
      jest
        .spyOn(productService, 'create')
        .mockImplementation(async () => result);

      expect(await productController.create(createProductDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateProductDto: UpdateProductDto = {
        location: 'Updated Location',
        price: 150,
      };
      const result: Product = {
        id: 1,
        productCode: '1000',
        description: 'Updated Description',
        location: 'Updated Location',
        price: 150,
      };
      jest
        .spyOn(productService, 'update')
        .mockImplementation(async () => result);

      expect(await productController.update('1000', updateProductDto)).toBe(
        result,
      );
    });
  });
});
