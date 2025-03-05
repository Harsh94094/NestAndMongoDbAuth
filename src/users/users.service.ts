import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, Role } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec(); 
  }

  async findOneByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.userModel.findOne({ $or: [{ username }, { email }] }).exec(); 
  }

  async create(username: string, password: string, roles: Role[], email: string): Promise<User> {
    const newUser = new this.userModel({ username, password, roles, email });
    return newUser.save();
  }
}