import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Tag) {
    Object.assign(this, args);
  }
}
