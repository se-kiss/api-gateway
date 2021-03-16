import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Playlist {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;
}
