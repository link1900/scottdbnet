import { WorkResponseStatus } from "./WorkResponseStatus";

export type WorkResponse<OutputType> = {
  id: string;
  status: WorkResponseStatus;
  error?: Error;
  output?: OutputType;
};
