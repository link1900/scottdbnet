import { Entity, VersionColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class BaseModel {
  @PrimaryGeneratedColumn('uuid')
  // @ts-ignore
  public id: string;

  @Index()
  @CreateDateColumn()
  // @ts-ignore
  createdAt: Date;

  @Index()
  @UpdateDateColumn()
  // @ts-ignore
  updatedAt: Date;

  @VersionColumn()
  // @ts-ignore
  public version: number;
}
