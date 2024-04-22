import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DateQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
}
