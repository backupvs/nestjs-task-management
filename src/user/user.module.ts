import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from 'src/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
