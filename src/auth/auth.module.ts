import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { User } from 'src/entities/User';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { OtpCleanupService } from './services/cronJobs.service';
import { ScheduleModule } from '@nestjs/schedule'
import { UserPassword } from 'src/entities/UserPassword';
import { Otp } from 'src/entities/Otp';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPassword, Otp]), ConfigModule.forRoot({
    isGlobal: true
  }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' }
  }), ScheduleModule.forRoot()],
  controllers: [AuthController],
  providers: [AuthService, OtpCleanupService]
})
export class AuthModule {}