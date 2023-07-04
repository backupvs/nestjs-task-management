import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { HashingServiceInterface } from './hashing/hashing.service.interface';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('HashingServiceInterface')
    private readonly hashingService: HashingServiceInterface,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.hashingService.hash(
      createUserDto.password,
    );
    return this.userService.createUser(createUserDto);
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByUsername(signInDto.username);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Password does not match');
    }

    return true;
  }
}
