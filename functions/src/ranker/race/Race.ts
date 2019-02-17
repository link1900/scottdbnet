import { Entity, Column } from 'typeorm';
import { BaseModel } from '../../database/BaseModel';

@Entity()
export class Race extends BaseModel {
  constructor(name: string, date: Date, grade: string, distanceMeters: number) {
    super();
    this.name = name;
    this.date = date;
    this.grade = grade;
    this.distanceMeters = distanceMeters;
  }

  @Column() name: string;

  @Column() date: Date;

  @Column() grade: string;

  @Column() distanceMeters: number;

  @Column() disqualified: boolean = false;

  @Column({ nullable: true })
  track?: string;

  @Column({ nullable: true })
  club?: string;
}
