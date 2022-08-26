import * as nock from "nock";

export default async function testSetup() {
  // eslint-disable-next-line no-console
  console.log("Running global test setup");
  process.env.EXECUTION_ENVIRONMENT = "local-test";

  // turn off external http requests
  nock.disableNetConnect();
  nock.enableNetConnect(/127\.0\.0\.1|localhost/);
}
