import { buildQueryFunction } from "@link1900/node-test-util";

const runAppInfoQuery = buildQueryFunction(
  `
  query {
    applicationInfo {
      name
    }
  }
`,
  "applicationInfo"
);

describe("ApplicationInfoResolver", () => {
  it("return the correct app info", async () => {
    const appInfo = await runAppInfoQuery();
    expect(appInfo).toEqual({
      name: "tipstar"
    });
  });
});
