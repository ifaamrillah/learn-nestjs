import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TASK_STATUS, TypeTaskStatus } from '../entities/task.entity';
import { IsIn } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsIn(TASK_STATUS, { message: 'Status is not valid' })
  status: TypeTaskStatus;
}
