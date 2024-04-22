import { PaginationQueryDto } from '../../../shared/dto/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatusEnum } from '../task.types';

export class TaskPaginationDto extends PaginationQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum = TaskStatusEnum.InProgress;
}
