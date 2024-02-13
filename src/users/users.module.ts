import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from 'src/entities/User';
import { UserPassword } from 'src/entities/UserPassword';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPassword])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}