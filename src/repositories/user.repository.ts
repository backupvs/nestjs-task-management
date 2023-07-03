import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseRepositoryAbstract } from './base/base.repository.abstract';
import { UserRepositoryInterface } from '../user/interfaces/user.repository.interface';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { PostgresErrorCodes } from 'src/constants/postgres-error-codes.enum';

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
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === PostgresErrorCodes.UniqueViolation) {
        throw new ConflictException('User with given username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
