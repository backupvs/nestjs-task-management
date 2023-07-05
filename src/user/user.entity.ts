import { Task } from 'src/task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'username',
    unique: true,
  })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[];
}
