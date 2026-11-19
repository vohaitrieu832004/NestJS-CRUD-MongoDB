import {
  CanActivate, ExecutionContext, ForbiddenException, Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Role } from '../users/entities/user.schema.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Đọc danh sách role cho phép; @Roles trên hàm ưu tiên hơn @Roles trên class
    const allowedRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!allowedRoles) return true;

    // user do AuthGuard gắn vào sau khi verify token → role đáng tin
    const { user } = context.switchToHttp().getRequest();
    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Bạn không có quyền thực hiện thao tác này');
    }
    return true;
  }
}