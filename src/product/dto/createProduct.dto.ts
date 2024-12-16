import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: '1000', description: 'The product code' })
  productCode: string;

  @ApiProperty({
    example: 'Test Product',
    description: 'The product description',
  })
  description: string;

  @ApiProperty({
    example: 'Test Location',
    description: 'The product location',
  })
  location: string;

  @ApiProperty({ example: 100, description: 'The product price' })
  price: number;
}
