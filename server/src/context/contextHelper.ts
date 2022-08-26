import { getVariable } from "@link1900/node-environment";
import { JwtAuthContextStep, RequestContextStep } from "@link1900/node-express";
import { StepSequence } from "@link1900/node-util";
import { Context } from "./Context";

let contextSequence: StepSequence<Context> | undefined;

export function getContextSequence() {
  if (contextSequence === undefined) {
    contextSequence = new StepSequence<Context>();
    contextSequence.addSteps([
      new RequestContextStep(),
      new JwtAuthContextStep({
        audience: getVariable("AUTH0_AUDIENCE"),
        configUrl: getVariable("AUTH0_CONFIG_URL")
      })
    ]);
  }

  return contextSequence;
}
