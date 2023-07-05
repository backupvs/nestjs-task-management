import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Task } from '../task/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { FilterDto } from '../task/dto/filter.dto';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.repository.abstract';
import { TaskRepositoryInterface } from '../task/interfaces/task.repository.interface';
import { User } from 'src/user/user.entity';
import { UpdateTaskDto } from 'src/task/dto/update-task.dto';

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

  async deleteTaskById(id: string, owner: User): Promise<DeleteResult | null> {
    const task = await this.getTaskById(id, owner);
    if (!task) return null;

    return this.delete(id);
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    owner: User,
  ): Promise<UpdateResult | null> {
    const task = await this.getTaskById(id, owner);
    if (!task) return null;

    return this.update(task, updateTaskDto);
  }

  async getTaskById(id: string, owner: User): Promise<Task> {
    const found = await this.findByCondition({
      where: { id, owner },
    });
    return found;
  }

  async getTasks(filterDto: FilterDto, owner: User): Promise<Task[]> {
    const { search, status } = filterDto;

    const queryBuilder = this.createQueryBuilder('task');
    queryBuilder.where({ owner });

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    const tasks = await queryBuilder.getMany();

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto, owner: User): Promise<Task> {
    const task = this.create({ ...createTaskDto, owner });

    return this.save(task);
  }
}
