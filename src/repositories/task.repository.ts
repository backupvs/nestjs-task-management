import { Repository } from 'typeorm';
import { Task } from '../task/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { FilterDto } from '../task/dto/filter.dto';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.repository.abstract';
import { TaskRepositoryInterface } from '../task/interfaces/task.repository.interface';

@Injectable()
export class TaskRepository
  extends BaseRepositoryAbstract<Task>
  implements TaskRepositoryInterface
{
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  async getTasks(filterDto: FilterDto): Promise<Task[]> {
    const { search, status } = filterDto;

    const queryBuilder = this.createQueryBuilder('task');

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await queryBuilder.getMany();

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.create(createTaskDto);

    return this.save(task);
  }
}
