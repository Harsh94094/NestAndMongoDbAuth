import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../users/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    console.log('Required roles:', requiredRoles);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('Request user:', request.user);
  
    if (!request.user || !request.user.roles) {
      throw new ForbiddenException('User not found');
    }
  
    const hasRole = request.user.roles.some((role) => requiredRoles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('User does not have the required roles');
    }
    return true;
  }
  
}