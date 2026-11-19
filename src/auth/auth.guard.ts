import {
  CanActivate, ExecutionContext, Injectable, UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Header có dạng: Authorization: Bearer <token>
    const header: string | undefined = request.headers.authorization;
    const [type, token] = header?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Thiếu token đăng nhập');
    }

    try {
      // verify kiểm tra chữ ký và hạn dùng; sai hoặc hết hạn sẽ ném lỗi
      request.user = await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }

    return true;
  }
}