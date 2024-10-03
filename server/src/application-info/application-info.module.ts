import { Module } from "@nestjs/common";
import { ApplicationInfoService } from "./application-info.service";
import { ApplicationInfoController } from "./application-info.controller";

@Module({
  controllers: [ApplicationInfoController],
  providers: [ApplicationInfoService],
})
export class ApplicationInfoModule {}
