import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentArgs {
  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  mediaId: string;

  @Field(() => String)
  text: string;
}

@InputType()
export class UpdateCommentArgs {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  text: string;
}

@InputType()
export class GetCommentsFilters {
  @Field(() => String, { nullable: true })
  parentId?: string;

  @Field(() => String, { nullable: true })
  mediaId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}

@InputType()
export class GetCommentsArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => GetCommentsFilters, { nullable: true })
  filters?: GetCommentsFilters;
}

@InputType()
export class DeleteCommentArgs {
  @Field(() => String)
  _id: string;
}

@InputType()
export class CommentsForMediaArgs {
  @Field(() => String)
  mediaId: string;
}
