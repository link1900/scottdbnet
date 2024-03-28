import { defineComponent } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export class ClickedProxy extends ComponentProxy<{}> {
  constructor() {
    super(defineComponent());
  }
}
