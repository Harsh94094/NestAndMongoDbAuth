import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getAdminData(): {
        message: string;
    };
    getUserData(): Promise<import("./users.entity").User[]>;
}
