import * as process from "node:process";
import winston from "winston";
import { utilities } from "nest-winston";
import { ApplicationInfoService } from "../application-info/application-info.service";

export function getWinstonSettings() {
  if (process.env.EXECUTION_ENVIRONMENT === "prod") {
    return getWinstonProdSettings();
  }
  return getWinstonLocalSettings();
}

export function getWinstonLocalSettings() {
  return {
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike(
            new ApplicationInfoService().getApplicationInfo().name,
            {
              colors: true,
              prettyPrint: true,
              processId: false,
              appName: true,
            },
          ),
        ),
      }),
    ],
  };
}

export function getWinstonProdSettings() {
  return {
    transports: [new winston.transports.Console()],
  };
}
