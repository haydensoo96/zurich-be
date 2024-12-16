import { IsString, IsNotEmpty } from 'class-validator';

export class FindProductDto {
  @IsString()
  @IsNotEmpty()
  productCode: string;

  @IsString()
  @IsNotEmpty()
  location: string;
}
