export default class Entity {
  public state: string;
  public name: string;
  public visible: boolean;
  public active: boolean;

  constructor({
    state,
    name = '',
    visible = true,
    active = true
  }: {
    state: string;
    name: string;
    visible: boolean;
    active: boolean;
  }) {
    this.state = state;
    this.name = name;
    this.visible = visible;
    this.active = active;
  }

  public render() {}

  public simulate() {}

  public enable() {
    this.visible = true;
    this.active = true;
  }

  public disable() {
    this.visible = false;
    this.active = false;
  }
}
