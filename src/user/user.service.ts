import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOneById(id);
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findByCondition({ where: { username } });
  }
}
