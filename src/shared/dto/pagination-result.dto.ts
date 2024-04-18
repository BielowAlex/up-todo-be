import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationResultDto<T> {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalItems: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPages: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  currentPage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limit: number;

  @ApiProperty() // Або вкажіть конкретний тип, якщо T - це конкретний клас
  data: T;
}
