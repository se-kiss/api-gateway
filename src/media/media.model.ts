import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Media {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  playlistId: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;

  constructor(args: Media) {
    Object.assign(this, args);
  }
}
