import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ApplicationInfo {
  @Field()
  name: string;
}
