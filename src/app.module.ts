import { Module } from '@nestjs/common';
import { TasksModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.env.NODE_ENV}.env`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: configService.get('NODE_ENV') === 'development',
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
    }),
    TasksModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
