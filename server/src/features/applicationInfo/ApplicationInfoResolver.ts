import { logger } from "@link1900/node-logger";
import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../../context/Context";
import { ApplicationInfo } from "./ApplicationInfo";

@Resolver()
export class ApplicationInfoResolver {
  @Query(() => ApplicationInfo)
  async applicationInfo(@Ctx() context: Context): Promise<ApplicationInfo> {
    logger.info("context", {
      reqId: context.requestId,
      auth: `${context.authenticated}`
    });
    return {
      name: "scottdbnet-api"
    };
  }
}
