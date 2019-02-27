import { Entity, Column, Index } from 'typeorm';
import { BaseModel } from '../../database/BaseModel';

@Entity()
export class Greyhound extends BaseModel {
  constructor(props: Partial<Greyhound>) {
    super();
    Object.assign(this, props);
  }

  @Index()
  @Column()
  public name: string;

  @Column({ type: 'uuid', nullable: true })
  public sireId?: string;

  @Column({ type: 'uuid', nullable: true })
  public damId?: string;

  @Column({ nullable: true })
  public color?: string;

  @Column({ nullable: true })
  public gender?: string;

  @Column({ nullable: true })
  public dateOfBirth?: Date;
}
