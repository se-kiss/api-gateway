import { ObjectType, registerEnumType, Field } from '@nestjs/graphql';

export enum MediaType {
  CLIP = 1,
  ARTICLE = 2,
}
registerEnumType(MediaType, { name: 'MediaType' });

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

  @Field(() => [String])
  tagIds: string[];

  @Field(() => MediaType)
  type: MediaType;

  @Field(() => String)
  _createdAt: Date;

  @Field(() => String)
  _updatedAt: Date;
}
