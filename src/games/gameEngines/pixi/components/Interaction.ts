import { defineComponent } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export class InteractionProxy extends ComponentProxy<{}> {
  constructor() {
    super(defineComponent());
  }
}
