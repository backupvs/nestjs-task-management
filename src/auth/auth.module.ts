import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from './hashing/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule],
  providers: [
    AuthService,
    {
      provide: 'HashingServiceInterface',
      useClass: BcryptService,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
