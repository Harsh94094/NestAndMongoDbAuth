import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Role } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly configService;
    private usersService;
    private jwtService;
    constructor(configService: ConfigService, usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string, email: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(email: string, username: string, password: string, roles?: Role[]): Promise<{
        access_token: string;
    }>;
}
