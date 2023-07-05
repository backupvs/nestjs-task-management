import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterDto } from './dto/filter.dto';
import { Task } from './task.entity';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ReqUser } from 'src/auth/types/req-user.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getTasks(
    @Query() filterDto: FilterDto,
    @GetUser() reqUser: ReqUser,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, reqUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() reqUser: ReqUser,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, reqUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() reqUser: ReqUser,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, reqUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteTaskById(@Param('id') id: string, @GetUser() reqUser: ReqUser) {
    return this.tasksService.deleteTaskById(id, reqUser.id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('/:id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() reqUser: ReqUser,
  ): Promise<void> {
    return this.tasksService.updateTaskById(id, updateTaskDto, reqUser.id);
  }
}
