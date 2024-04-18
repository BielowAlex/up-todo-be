import { Injectable, Logger, Scope } from '@nestjs/common';

import { RequestContext } from '../request-context/request-context.dto';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger {
  private logger: Logger;

  public setContext(context: string): void {
    this.logger = new Logger(context);
  }

  error(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): void {
    const timestamp = new Date().toISOString();
    const { url, requestID } = ctx;

    this.logger.error(`URL: ${url}`);
    this.logger.error(`RequestID: ${requestID} `);
    this.logger.error(`Error message: ${message}`);
    this.logger.error(`Timestamp: ${timestamp}`);

    if (meta) {
      this.logger.error(`Details: ${JSON.stringify(meta)}`);
    }
  }

  warn(ctx: RequestContext, message: string, meta?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const { url, requestID } = ctx;

    this.logger.warn(`URL: ${url}`);
    this.logger.warn(`RequestID: ${requestID} `);
    this.logger.warn(`Error message: ${message}`);
    this.logger.warn(`Timestamp: ${timestamp}`);

    if (meta) {
      this.logger.warn(`Details: ${JSON.stringify(meta)}`);
    }
  }

  debug(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): void {
    const timestamp = new Date().toISOString();
    const { url, requestID } = ctx;

    this.logger.debug(`URL: ${url}`);
    this.logger.debug(`RequestID: ${requestID}`);
    this.logger.debug(message);
    this.logger.debug(`Timestamp: ${timestamp}`);

    if (meta) {
      this.logger.debug(`Details: ${JSON.stringify(meta)}`);
    }
  }

  verbose(
    ctx: RequestContext,
    message: string,
    meta?: Record<string, any>,
  ): void {
    const timestamp = new Date().toISOString();
    const { url, requestID } = ctx;

    this.logger.verbose(`URL: ${url}`);
    this.logger.verbose(`RequestID: ${requestID}`);
    this.logger.verbose(message);
    this.logger.verbose(`Timestamp: ${timestamp}`);

    if (meta) {
      this.logger.verbose(`Details: ${JSON.stringify(meta)}`);
    }
  }

  log(ctx: RequestContext, message: string, meta?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    const { url, requestID } = ctx;

    this.logger.log(`URL: ${url}`);
    this.logger.log(`RequestID: ${requestID}`);
    this.logger.log(message);
    this.logger.log(`Timestamp: ${timestamp}`);

    if (meta) {
      this.logger.log(`Details: ${JSON.stringify(meta)}`);
    }
  }
}
