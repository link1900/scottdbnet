import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ApplicationInfoModule } from "./application-info/application-info.module";
import { HealthModule } from "./health/health.module";
import { configSettings } from "./settings/config-settings";
import { TraceMiddleware } from "./trace/trace.middleware";
import { ConfigModule } from "@nestjs/config";
import { CounterModule } from "./counter/counter.module";

@Module({
  imports: [
    ApplicationInfoModule,
    HealthModule,
    ConfigModule.forRoot(configSettings),
    CounterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(TraceMiddleware).forRoutes("*");
  }
}
