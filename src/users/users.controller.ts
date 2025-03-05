import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/oles.decorator'; 
import { Role } from './users.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('users')

export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @Get('admin')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  getAdminData() {
    return { message: 'Admin content' };
  }

  @Get('user')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.USER)
  getUserData() {
    return this.userService.findAll();
  }
}