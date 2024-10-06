import { Test, TestingModule } from "@nestjs/testing";
import { buildTestModuleScaffold } from "../../test/test-util";
import { CounterController } from "./counter.controller";
import { CounterRepository } from "./counter.repository";
import { CounterService } from "./counter.service";

describe("CounterController", () => {
  let controller: CounterController;

  beforeEach(async () => {
    const module: TestingModule = await buildTestModuleScaffold({
      providers: [CounterController],
      mockProviders: [CounterService],
    });

    controller = module.get<CounterController>(CounterController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
