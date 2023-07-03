import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    {
      provide: 'TaskRepositoryInterface',
      useClass: TaskRepository,
    },
    TasksService,
  ],
})
export class TasksModule {}
