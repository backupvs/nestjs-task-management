import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersRepositoryInterface')
    private readonly usersRepository: UserRepositoryInterface,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.usersRepository.createUser(createUserDto);
  }
}
