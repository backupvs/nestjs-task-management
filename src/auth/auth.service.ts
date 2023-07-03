import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    return this.userService.createUser(createUserDto);
  }
}
