import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { LogsService } from '@thefirstspine/logs';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logsService: LogsService,
  ) {}
    
  use(request: Request, response: Response, next: NextFunction): void {
    try {
      const { ip, method, path: url } = request;
      const userAgent = request.get('user-agent') || '';
  
      response.on('close', () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
  
        this.logsService.info(
          `Request ${method} ${url}`,
          {
              statusCode,
              contentLength,
              userAgent,
              ip,
          }
        );
      });
    } catch (e) {
      this.logsService.error(
        `Error while logging request`,
        {
            error: e.getMessage(),
        }
      );
    }

    next();
  }
}