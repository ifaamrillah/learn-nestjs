import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create: should create task', () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      description: 'Description 1',
    };

    const task: Task = service.create(createTaskDto);

    expect(task.title).toBe(createTaskDto.title);
    expect(task.description).toBe(createTaskDto.description);
    expect(task.isDeleted).toBe(false);

    expect(task.id).toBe(2);

    expect(service.findAll()).toHaveLength(2);
  });
});
