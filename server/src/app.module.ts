import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ApplicationInfoModule } from "./application-info/application-info.module";
import { HealthModule } from "./health/health.module";
import { TraceMiddleware } from "./trace/trace.middleware";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ApplicationInfoModule,
    HealthModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TraceMiddleware).forRoutes("*");
  }
}
