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

  findOne(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id && !task.isDeleted);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);
    if (task) {
      if (updateTaskDto.status) task.status = updateTaskDto.status;
      if (updateTaskDto.title) task.title = updateTaskDto.title;
      if (updateTaskDto.description)
        task.description = updateTaskDto.description;

      task.updatedAt = Date.now();
    }
    return task;
  }

  remove(id: number) {
    const task = this.findOne(id);
    if (task) {
      task.isDeleted = true;
      task.updatedAt = Date.now();
      return task;
    }
    return undefined;
  }
}
