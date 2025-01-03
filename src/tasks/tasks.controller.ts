import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller({
  version: '1',
  path: 'tasks',
})
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const task = this.tasksService.findOne(id);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    const task = this.tasksService.update(id, updateTaskDto);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const task = this.tasksService.remove(id);
    if (task === undefined) {
      throw new NotFoundException('task not found');
    }
    return task;
  }
}
