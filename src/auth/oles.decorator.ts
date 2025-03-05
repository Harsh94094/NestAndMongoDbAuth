// filepath: /home/xrstudio/Desktop/HarshFristProject/nestAndMongoauth/nest-auth/src/auth/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '../users/users.entity';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);