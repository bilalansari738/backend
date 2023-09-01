import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from './roles.enum';
  import { ROLES_KEY } from './roles.decorator';
  
  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const { user } = context.switchToHttp().getRequest();
      if (user?.role === 'admin') {
        return true;
      } else {
        throw new ForbiddenException('Only admin can perform this action!');
      }
    }
  }
  