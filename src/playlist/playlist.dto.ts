import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlaylistArgs {
  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerId: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String])
  tagIds: string[];
}

@InputType()
export class UpdatePlaylistArgs {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}

@InputType()
export class GetPlaylistFilter {
  @Field(() => String, { nullable: true })
  ownerId?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];
}

@InputType()
export class GetPlaylistArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => GetPlaylistFilter, { nullable: true })
  filters?: GetPlaylistFilter;
}

@InputType()
export class DeletePlaylistArgs {
  @Field(() => String)
  _id: string;
}
