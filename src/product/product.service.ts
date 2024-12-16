import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findOne(productCode: string, location: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productCode, location },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findOneUpdate(productCode: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productCode },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  async update(
    productCode: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { productCode },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateProductDto);
    try {
      return await this.productRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async remove(productCode: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { productCode },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    try {
      await this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}
