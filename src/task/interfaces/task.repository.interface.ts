import { BaseRepositoryInterface } from 'src/repositories/base/base.repository.interface';
import { Task } from '../task.entity';
import { FilterDto } from '../dto/filter.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { User } from 'src/user/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateTaskDto } from '../dto/update-task.dto';

export interface TaskRepositoryInterface extends BaseRepositoryInterface<Task> {
  getTaskById(id: string, owner: User): Promise<Task>;
  getTasks(filterDto: FilterDto, owner: User): Promise<Task[]>;
  createTask(createTaskDto: CreateTaskDto, owner: User): Promise<Task>;
  updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
    owner: User,
  ): Promise<UpdateResult>;
  deleteTaskById(id: string, owner: User): Promise<DeleteResult>;
}
