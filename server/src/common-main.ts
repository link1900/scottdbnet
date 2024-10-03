import { WinstonModule } from "nest-winston";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getWinstonSettings } from "./logger-settings";

export async function createNestApp() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(getWinstonSettings()),
  });
  const apiPrefix = process.env.API_PREFIX;
  if (apiPrefix) {
    app.setGlobalPrefix("/api");
  }
  return app;
}
