import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { LogsService } from '@thefirstspine/logs';
import { LogsService as TFSLogsService } from '@thefirstspine/logs';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {

  private readonly logsService: LogsService;

  constructor() {
    this.logsService = new TFSLogsService({
      console: true,
      loggly: (process.env.LOGS_LOGGLY_SUBDOMAIN != undefined && process.env.LOGS_LOGGLY_TOKEN != undefined),
      datadog: (process.env.LOGS_DD_API_KEY != undefined),
    });
  }
    
  use(request: Request, response: Response, next: NextFunction): void {
    try {
      const { ip, method, path: url } = request;
      const userAgent = request.get('user-agent') || '';
  
      response.on('finish', () => {
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