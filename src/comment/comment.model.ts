import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Comment {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String)
  mediaId: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  _createdAt: string;

  @Field(() => String)
  _updatedAt: string;
}

@ObjectType()
export class CommentForMedia {
  @Field(() => String)
  commentId: string;

  @Field(() => [CommentForMedia], { nullable: true })
  children: CommentForMedia[];
}
