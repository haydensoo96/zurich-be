import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productCode/:location')
  async findOne(@Param() params: { productCode: string; location: string }) {
    return this.productService.findOne(params.productCode, params.location);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':productCode')
  async update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productCode, updateProductDto);
  }

  @Delete(':productCode')
  async remove(@Param('productCode') productCode: string) {
    return this.productService.remove(productCode);
  }
}
