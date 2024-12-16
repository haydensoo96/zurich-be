import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/index.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':productCode/:location')
  async findOne(@Param() params: { productCode: string; location: string }) {
    return this.productService.findOne(params.productCode, params.location);
  }

  @Post()
  @Roles('admin')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Put(':productCode')
  @Roles('admin')
  async update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productCode, updateProductDto);
  }

  @Delete(':productCode')
  @Roles('admin')
  async delete(@Param('productCode') productCode: string) {
    return this.productService.remove(productCode);
  }
}
