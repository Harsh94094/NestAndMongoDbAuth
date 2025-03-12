import { Model } from 'mongoose';
import { User, Role } from './users.entity';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<User[]>;
    findOneByUsernameOrEmail(username: string, email: string): Promise<User | null>;
    create(username: string, password: string, roles: Role[], email: string): Promise<User>;
}
