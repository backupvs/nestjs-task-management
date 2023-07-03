import { BaseRepositoryInterface } from 'src/repositories/base/base.repository.interface';
import { Task } from '../task.entity';
import { FilterDto } from '../dto/filter.dto';
import { CreateTaskDto } from '../dto/create-task.dto';

export interface TaskRepositoryInterface extends BaseRepositoryInterface<Task> {
  getTasks(filterDto: FilterDto): Promise<Task[]>;
  createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
