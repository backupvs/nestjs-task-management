import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './types/task-status.enum';
import { User } from 'src/user/user.entity';
import { Exclude } from 'class-transformer';

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

  @Exclude({ toPlainOnly: true })
  @ManyToOne(() => User, (user) => user.tasks)
  owner: User;
}
