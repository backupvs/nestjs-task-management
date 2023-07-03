import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './types/task-status.enum';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.OPEN,
  })
  status: TaskStatus;
}
