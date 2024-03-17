import { defineComponent } from "bitecs";
import { ComponentProxy } from "../../bitECS/ComponentProxy";

export const Clicked = defineComponent();

export class ClickedProxy extends ComponentProxy<typeof Clicked> {
  constructor() {
    super("clicked", Clicked);
  }
}
