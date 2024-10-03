import { Controller, Get } from "@nestjs/common";
import { ApplicationInfoService } from "./application-info.service";

@Controller("application-info")
export class ApplicationInfoController {
  constructor(
    private readonly applicationInfoService: ApplicationInfoService,
  ) {}

  @Get()
  get() {
    return this.applicationInfoService.getApplicationInfo();
  }
}
