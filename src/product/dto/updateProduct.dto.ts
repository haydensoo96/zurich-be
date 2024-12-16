import { IsString, IsDecimal, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDecimal()
  @IsOptional()
  price?: number;
}
