import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../database/BaseModel';

@Entity()
export class Score extends BaseModel {
  constructor(placingId: string, type: string, amount: number) {
    super();
    this.placingId = placingId;
    this.type = type;
    this.amount = amount;
  }

  @Column({ type: 'uuid' })
  placingId: string;

  @Column() type: string;

  @Column() amount: number;
}
