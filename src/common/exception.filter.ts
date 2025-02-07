import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Error } from './exceptions';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.code || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || 'Internal server error';

    response.status(status).json({
      code: status,
      message,
    });
  }
}
