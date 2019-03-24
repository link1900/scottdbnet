import { Entity, VersionColumn, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Index } from 'typeorm';
import { toGlobalId } from '../graphql/graphqlSchemaBuilders';

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

  public get nodeId() {
    return toGlobalId(this.constructor.name, this.id);
  }
}
