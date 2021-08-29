import uuid from "uuid";
import Entity from "./Entity";

export interface WorldProps {
  id?: string;
  entities?: Entity[];
  framesPerSecond?: number;
}

export class World {
  public id: string;
  public entities: Entity[];
  public framesPerSecond: number;
  public running: boolean = false;
  private intervalId: number | undefined = undefined;

  constructor({
    id = uuid.v4(),
    entities = [],
    framesPerSecond = 60
  }: WorldProps) {
    this.id = id;
    this.entities = entities;
    this.framesPerSecond = framesPerSecond;
  }

  public addEntity(entity: Entity) {
    this.entities.push(entity);
  }

  public start() {
    if (this.intervalId === undefined) {
      this.intervalId = window.setInterval(() => {
        this.step();
      }, 1000 / this.framesPerSecond);
    }
  }

  public stop() {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  public destroy() {
    this.stop();
    this.entities = [];
  }

  public step() {
    this.simulate();
    this.render();
  }

  public render() {
    this.entities.forEach(e => e.runRender());
  }

  public simulate() {
    this.entities = this.entities.filter(e => e.alive);
    this.entities.forEach(e => e.runSimulate());
  }
}
