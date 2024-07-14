import { defineComponent } from "bitecs";
import { ComponentProxy } from "../../gameEngines/bitECS/ComponentProxy";

export class BalloonTagProxy extends ComponentProxy<{}> {
  constructor() {
    super(defineComponent());
  }
}
