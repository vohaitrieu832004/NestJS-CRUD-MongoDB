import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class LoggingExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger('HTTP');

  catch(exception: unknown, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest();
    // Chỉ ghi method + URL + mã lỗi. KHÔNG ghi body, header (có token), mật khẩu
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    this.logger.warn(`${req.method} ${req.originalUrl} → ${status}`);
    super.catch(exception, host);
  }
}