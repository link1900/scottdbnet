import { createMock } from "@golevelup/ts-jest";
import { Provider } from "@nestjs/common/interfaces/modules/provider.interface";
import { Test } from "@nestjs/testing";
import { MockFunctionMetadata, ModuleMocker } from "jest-mock";

const moduleMocker = new ModuleMocker(global);

export interface TestModuleScaffoldOptions {
  providers?: Provider[];
  mockProviders?: Provider[];
}

export async function buildTestModuleScaffold(
  options: TestModuleScaffoldOptions,
) {
  return await Test.createTestingModule({
    providers: options.providers,
  })
    .useMocker((token) => {
      if (options.mockProviders?.find((p) => p === token)) {
        return createMock(token);
      }
      if (typeof token === "function") {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();
}
