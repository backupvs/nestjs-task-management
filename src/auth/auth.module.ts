import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UsersRepositoryInterface',
      useClass: UserRepository,
    },
    AuthService,
    UserService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
