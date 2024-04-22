import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task.types';

export class TaskFilterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum = TaskStatusEnum.InProgress;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: string;
}
