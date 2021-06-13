import uuid from 'uuid';
import { World } from './World';

export interface EntityProps {
  id?: string;
  visible?: boolean;
  active?: boolean;
  alive?: boolean;
  world: World;
}

export default class Entity {
  public id: string;
  // renders when true
  public visible: boolean;
  // simulates when true
  public active: boolean;
  // should be removed
  public alive: boolean;
  public world: World;

  constructor({ id = uuid.v4(), visible = true, active = true, alive = true, world }: EntityProps) {
    this.id = id;
    this.visible = visible;
    this.active = active;
    this.alive = alive;
    this.world = world;
  }

  public render() {}

  public shouldRender() {
    return this.visible && this.alive;
  }

  public shouldSimulate() {
    return this.active && this.alive;
  }

  public simulate() {}

  public enable() {
    this.visible = true;
    this.active = true;
  }

  public disable() {
    this.visible = false;
    this.active = false;
  }

  public kill() {
    this.alive = false;
  }
}
