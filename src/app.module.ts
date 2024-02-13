import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './entities/User';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './utils/errorHandler';
import { UserPassword } from './entities/UserPassword';
import { Otp } from './entities/Otp';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    entities: [User, UserPassword, Otp],
    synchronize: true
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, {provide:APP_FILTER, useClass: GlobalExceptionFilter}],
})
export class AppModule {}
