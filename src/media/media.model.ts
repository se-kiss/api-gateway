import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum MediaType {
  CLIP = 1,
  ARTICLE = 2,
}
registerEnumType(MediaType, { name: 'MediaType' });

@ObjectType()
export class Media {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  playlistId: string;

  @Field(() => String)
  name: string;

  @Field(() => MediaType)
  type: MediaType;

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
