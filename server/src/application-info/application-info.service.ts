import { Injectable } from "@nestjs/common";
import { ApplicationInfo } from "./entities/application-info.entity";

@Injectable()
export class ApplicationInfoService {
  getApplicationInfo(): ApplicationInfo {
    return {
      name: "scottdbnet-api",
    };
  }
}
