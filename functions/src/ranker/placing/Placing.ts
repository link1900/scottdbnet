import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../database/BaseModel';

@Entity()
export class Placing extends BaseModel {
  constructor(place: string, raceId: string, greyhoundId: string) {
    super();
    this.place = place;
    this.raceId = raceId;
    this.greyhoundId = greyhoundId;
  }

  @Column() place: string;

  @Column({ type: 'uuid' })
  raceId: string;

  @Column({ type: 'uuid' })
  greyhoundId: string;

  @Column({ nullable: true })
  prizeMoney?: number;

  @Column({ nullable: true })
  time?: number;

  @Column({ nullable: true })
  margin?: string;
}
