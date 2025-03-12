import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    login(body: {
        username: string;
        password: string;
        email: string;
    }): Promise<{
        access_token: string;
    }>;
}
