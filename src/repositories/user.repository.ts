import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { UserRepositoryInterface } from '../user/interfaces/user.repository.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const user = this.create(createUserDto);
    await this.save(user);
  }
}
