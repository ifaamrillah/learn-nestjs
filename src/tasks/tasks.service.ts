import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      status: 'TODO',
      ownerId: -1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isDeleted: false,
    },
  ];

  create(createTaskDto: CreateTaskDto) {
    const task = new Task(
      this.tasks.length + 1,
      createTaskDto.title,
      createTaskDto.description,
    );

    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
