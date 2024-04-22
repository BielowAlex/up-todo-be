import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TaskStatusEnum } from '../task.types';
import { User } from '../../user/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  autoIndex: true,
  timestamps: true,
})
export class Task {
  _id: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: false })
  description: string;
  @Prop({
    required: true,
    enum: TaskStatusEnum,
    default: TaskStatusEnum.InProgress,
  })
  status: TaskStatusEnum;

  @Prop({ required: true })
  date: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
