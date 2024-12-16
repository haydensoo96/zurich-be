import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';

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
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    productCode: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOneUpdate(productCode);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(productCode: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { productCode },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
  }
}
