import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { TaskPaginationDto } from './dto/task-pagination.dto';
import { TaskStatusEnum } from './task.types';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) protected readonly taskModel: Model<Task>,
    protected readonly userService: UserService,
  ) {}
  public async create(userId: string, createTaskDto: CreateTaskDto) {
    await this.userService.getById(userId);

    return await new this.taskModel({
      ...createTaskDto,
      user: userId,
    }).save();
  }

  public async gatAllWithPagination(
    pagination: TaskPaginationDto,
    userId: string,
  ) {
    const {
      limit = 10,
      page = 1,
      search,
      status = TaskStatusEnum.InProgress,
    } = pagination;

    const skip: number = +limit * (+page - 1);

    const searchFilter = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {};

    const filter = { ...searchFilter, user: userId, status };

    const data = await this.taskModel
      .find(filter)
      .limit(+limit)
      .skip(skip)
      .sort({ ['createdAt']: -1 })
      .exec();

    const total = await this.taskModel.countDocuments(filter).exec();

    const totalPages = Math.ceil(+total / +limit);

    return { data, limit, page, total, totalPages };
  }

  public async getAllByStatus(
    { status = TaskStatusEnum.InProgress, date }: TaskFilterDto,
    userId: string,
  ): Promise<Task[]> {
    return await this.taskModel.find({ status, user: userId, date }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  public async update(
    id: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const updatedTask: Task = await this.taskModel
      .findOneAndUpdate({ _id: id, user: userId }, updateTaskDto, {
        new: true,
        runValidators: true,
      })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task not found`);
    }

    return updatedTask;
  }

  public async remove(id: string, userId: string) {
    const result = await this.taskModel
      .deleteOne({ _id: id, user: userId })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Task not found`);
    }

    return {
      result,
      message: 'Task Delete Successfully',
    };
  }
}
