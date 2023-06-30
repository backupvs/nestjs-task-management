import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
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
