import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  private readonly logger = new Logger("Router");
  use(req: any, res: any, next: () => void) {
    this.logger.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
  }
}
