import { TestingModule } from "@nestjs/testing";
import { buildTestModuleScaffold } from "../../test/test-util";
import { CounterRepository } from "./counter.repository";
import { CounterService } from "./counter.service";

describe("CounterService", () => {
  let service: CounterService;

  beforeEach(async () => {
    const module: TestingModule = await buildTestModuleScaffold({
      providers: [CounterService],
      mockProviders: [CounterRepository],
    });

    service = module.get<CounterService>(CounterService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
