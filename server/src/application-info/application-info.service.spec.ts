import { Test, TestingModule } from "@nestjs/testing";
import { ApplicationInfoService } from "./application-info.service";

describe("ApplicationInfoService", () => {
  let service: ApplicationInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationInfoService],
    }).compile();

    service = module.get<ApplicationInfoService>(ApplicationInfoService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
