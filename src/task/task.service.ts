import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterDto } from './dto/filter.dto';
import { Task } from './task.entity';
import { TaskRepositoryInterface } from './interfaces/task.repository.interface';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TasksRepositoryInterface')
    private readonly tasksRepository: TaskRepositoryInterface,
  ) {}

  getTasks(filterDto: FilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneById(id);

    if (!found) {
      throw new NotFoundException('User with given id was not found');
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const res = await this.tasksRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException('User with given id was not found');
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    const res = await this.tasksRepository.update(id, updateTaskDto);

    if (res.affected === 0) {
      throw new NotFoundException('User with given id was not found');
    }
  }
}
