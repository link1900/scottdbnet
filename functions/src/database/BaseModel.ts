import { Entity, VersionColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  // @ts-ignore
  public id: string;

  @CreateDateColumn()
  // @ts-ignore
  createdAt: Date;

  @UpdateDateColumn()
  // @ts-ignore
  updatedAt: Date;

  @VersionColumn()
  // @ts-ignore
  public version: number;
}
