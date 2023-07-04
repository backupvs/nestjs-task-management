import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { HashingServiceInterface } from './hashing/hashing.service.interface';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt-payload.interface';
import { SignInResponse } from './types/sign-in-response.interface';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject('HashingServiceInterface')
    private readonly hashingService: HashingServiceInterface,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    createUserDto.password = await this.hashingService.hash(
      createUserDto.password,
    );
    return this.userService.createUser(createUserDto);
  }

  async signIn({ username, password }: SignInDto): Promise<SignInResponse> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect');
    }

    const payload: JwtPayload = {
      userId: user.id,
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByUsername(username);

    if (user && (await this.hashingService.compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result;
    }

    return null;
  }
}
