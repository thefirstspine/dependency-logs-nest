import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { LogsService } from '@thefirstspine/logs';
import { LogsService as TFSLogsService } from '@thefirstspine/logs';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestsLoggerMiddleware implements NestMiddleware {

  private static logsService: LogsService|undefined = undefined;

  constructor() {
  }
    
  use(request: Request, response: Response, next: NextFunction): void {
    RequestsLoggerMiddleware.use(request, response, next);
  }

  public static use(request: Request, response: Response, next: NextFunction) {
    if (RequestsLoggerMiddleware.logsService == undefined) {
      RequestsLoggerMiddleware.logsService = new TFSLogsService({
        console: true,
        loggly: (process.env.LOGS_LOGGLY_SUBDOMAIN != undefined && process.env.LOGS_LOGGLY_TOKEN != undefined),
        datadog: (process.env.LOGS_DD_API_KEY != undefined),
      });
    }

    try {
      const { ip, method, path: url } = request;
      const userAgent = request.get('user-agent') || '';
  
      response.on('finish', () => {
        const { statusCode } = response;
        const contentLength = response.get('content-length');
  
        RequestsLoggerMiddleware.logsService.info(
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
      RequestsLoggerMiddleware.logsService.error(
        `Error while logging request`,
        {
            error: e.getMessage(),
        }
      );
    }

    next();
  }
}