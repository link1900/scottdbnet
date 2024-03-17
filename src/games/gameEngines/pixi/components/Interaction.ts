import { defineComponent } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const Interaction = defineComponent();

export class InteractionProxy extends ComponentProxy<typeof Interaction> {
  constructor() {
    super("interaction", Interaction);
  }
}
