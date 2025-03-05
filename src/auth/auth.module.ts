
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'efefefef',
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController,UsersController],
  exports: [AuthService],
})
export class AuthModule {}