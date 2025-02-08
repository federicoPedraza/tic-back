import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception);

    const status = exception.code || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message || exception;

    response.status(status).json({
      code: status,
      message,
    });
  }
}
