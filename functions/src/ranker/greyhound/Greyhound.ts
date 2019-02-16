import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../database/BaseModel';

@Entity()
export class Greyhound extends BaseModel {
  // @ts-ignore
  @Column() name: string;

  @Column({ type: 'uuid', nullable: true })
  sireId?: string;

  @Column({ type: 'uuid', nullable: true })
  damId?: string;

  @Column({ nullable: true })
  color?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;
}
