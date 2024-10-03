import { Test, TestingModule } from "@nestjs/testing";
import { ApplicationInfoController } from "./application-info.controller";
import { ApplicationInfoService } from "./application-info.service";

describe("ApplicationInfoController", () => {
  let controller: ApplicationInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationInfoController],
      providers: [ApplicationInfoService],
    }).compile();

    controller = module.get<ApplicationInfoController>(
      ApplicationInfoController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
