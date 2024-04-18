import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SortEnum } from '../types/pagination.types';

export class PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Optional, defaults to 4',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  limit: number = 20;

  @ApiPropertyOptional({
    description: 'Optional, defaults to 1',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Sort enum, default latest',
    type: String,
  })
  @IsEnum(SortEnum)
  @IsOptional()
  sort: SortEnum = SortEnum.LATEST;

  @ApiPropertyOptional({
    description: 'Search query',
    type: String,
  })
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  date_from: string;

  @IsString()
  @IsOptional()
  date_to: string;
}
