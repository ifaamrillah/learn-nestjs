import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll: should return empty tasks', () => {
    const tasks: Task[] = [];

    jest.spyOn(service, 'findAll').mockImplementation((): Task[] => tasks);

    const actual = controller.findAll();
    expect(actual).toHaveLength(0);
  });

  it('findAll: should return all tasks', () => {
    const tasks: Task[] = [
      new Task(1, 'Task 1', 'Description 1'),
      new Task(2, 'Task 2', 'Description 2'),
    ];

    jest.spyOn(service, 'findAll').mockImplementation((): Task[] => tasks);

    const actual = controller.findAll();
    expect(actual).toBe(tasks);
  });

  it('findOne: should return task', () => {
    const task: Task = new Task(1, 'Task 1', 'Description 1');

    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(task.id);
        return task;
      });

    const actual = controller.findOne(task.id);
    expect(actual).toBe(task);
  });

  it('findOne: should throw NotFoundException', () => {
    const taskId: number = 1;
    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: number): Task | undefined => {
        expect(id).toBe(taskId);
        return undefined;
      });

    const actual = () => controller.findOne(taskId);
    expect(actual).toThrow(NotFoundException);
  });
});
