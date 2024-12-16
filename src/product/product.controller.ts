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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('products')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Get a product by code and location' })
  @ApiResponse({ status: 200, description: 'The found product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Get(':productCode/:location')
  async findOne(@Param() params: { productCode: string; location: string }) {
    return this.productService.findOne(params.productCode, params.location);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'The created product' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  @Roles('admin')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'The updated product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Put(':productCode')
  @Roles('admin')
  async update(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(productCode, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 204, description: 'The product has been deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':productCode')
  @Roles('admin')
  async delete(@Param('productCode') productCode: string) {
    return this.productService.remove(productCode);
  }
}
