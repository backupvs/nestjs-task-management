import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: FilterDto) {
    let tasks = this.getAllTasks();

    const { status, search } = filterDto;

    tasks = tasks.filter((task) => {
      if (status && task.status !== status) {
        return false;
      }

      if (
        search &&
        !(task.title.includes(search) || task.description.includes(search))
      ) {
        return false;
      }

      return true;
    });

    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): Task {
    let updatedTask: Task = null;

    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        updatedTask = {
          ...task,
          ...updateTaskDto,
        };
        return updatedTask;
      }
      return task;
    });

    return updatedTask;
  }

  updateTaskStatusById(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
