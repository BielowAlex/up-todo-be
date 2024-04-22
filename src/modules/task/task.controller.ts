import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ExtractUserId } from '../../shared/decorators/extract-user-id.decorator';
import { TaskPaginationDto } from './dto/task-pagination.dto';
import { TaskFilterDto } from './dto/task-filter.dto';
import { Task } from './schemas/task.schema';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtGuard)
  public async create(
    @ExtractUserId() userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.create(userId, createTaskDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  public async findAll(
    @Query() pagination: TaskPaginationDto,
    @ExtractUserId() userId: string,
  ) {
    return await this.taskService.gatAllWithPagination(pagination, userId);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  public async getAllWithFilter(
    @Query() filterQuery: TaskFilterDto,
    @ExtractUserId() userId: string,
  ) {
    return await this.taskService.getAllByStatus(filterQuery, userId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch('/:id')
  @UseGuards(JwtGuard)
  public async update(
    @Param('id') id: string,
    @ExtractUserId() userId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(id, userId, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  public async remove(
    @Param('id') id: string,
    @ExtractUserId() userId: string,
  ) {
    return await this.taskService.remove(id, userId);
  }
}
