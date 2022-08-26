import "reflect-metadata";
import path from "path";
import { applicationInit } from "../serve/configHelper";
import { startServer } from "./expressServerHelper";

main()
  .then(() => {
    console.info("Server start up is complete");
  })
  .catch((error: Error) => {
    console.error(`Error starting server`, error);
  });

async function main() {
  await applicationInit(path.join(__dirname, "..", "config"));
  return startServer();
}
