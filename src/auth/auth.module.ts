import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from './hashing/bcrypt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { createJwtOptions } from './config/create-jwt-options.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: createJwtOptions,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: 'HashingServiceInterface',
      useClass: BcryptService,
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
