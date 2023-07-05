import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from '../repositories/task.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
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
