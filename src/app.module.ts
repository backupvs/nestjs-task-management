import { Module } from '@nestjs/common';
import { TasksModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.env.NODE_ENV}.env`],
    }),
    DatabaseModule,
    TasksModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
