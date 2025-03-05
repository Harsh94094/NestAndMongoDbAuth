import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    console.log('JWT_SECRET:', this.configService.get<string>('JWT_SECRET'));
  }

  async validateUser(username: string, pass: string, email: string): Promise<any> {
    const user = await this.usersService.findOneByUsernameOrEmail(username, email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id, roles: user.roles, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, username: string, password: string, roles: Role[] = [Role.USER]) {
    const user = await this.usersService.create(username, password, roles, email);
    const payload = { username: user.username, sub: user._id, roles: user.roles, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}