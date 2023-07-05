import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterDto } from './dto/filter.dto';
import { Task } from './task.entity';
import { TaskRepositoryInterface } from './interfaces/task.repository.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TaskRepositoryInterface')
    private readonly taskRepository: TaskRepositoryInterface,
    private readonly userService: UserService,
  ) {}

  async getTasks(filterDto: FilterDto, ownerId: string): Promise<Task[]> {
    const user = await this.userService.findById(ownerId);
    return this.taskRepository.getTasks(filterDto, user);
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    ownerId: string,
  ): Promise<Task> {
    const user = await this.userService.findById(ownerId);
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id: string, ownerId: string): Promise<Task> {
    const user = await this.userService.findById(ownerId);
    const found = await this.taskRepository.getTaskById(id, user);

    if (!found) {
      throw new NotFoundException('Task was not found');
    }

    return found;
  }

  async deleteTaskById(id: string, ownerId: string): Promise<void> {
    const user = await this.userService.findById(ownerId);
    const res = await this.taskRepository.deleteTaskById(id, user);

    if (!res || res.affected === 0) {
      throw new NotFoundException('Task with given id was not found');
    }
  }

  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    ownerId: string,
  ): Promise<void> {
    const user = await this.userService.findById(ownerId);
    const res = await this.taskRepository.updateTaskById(
      id,
      updateTaskDto,
      user,
    );

    if (!res || res.affected === 0) {
      throw new NotFoundException('Task with given id was not found');
    }
  }
}
