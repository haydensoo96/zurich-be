import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !user.roles) {
      throw new ForbiddenException('Only admins can perform this action');
    }
    const hasRole = roles.some((role) => user.roles.includes(role));
    if (!hasRole) {
      throw new ForbiddenException('Only admins can perform this action');
    }
    return true;
  }
}
