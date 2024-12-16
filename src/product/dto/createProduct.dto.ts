import { IsString, IsDecimal } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productCode: string;

  @IsString()
  description: string;

  @IsString()
  location: string;

  @IsDecimal()
  price: number;
}
