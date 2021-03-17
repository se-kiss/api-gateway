import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchArgs {
  @Field(() => String)
  text: string;

  @Field(() => Number)
  from: number;

  @Field(() => Number)
  size: number;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  tags?: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  types?: string[];
}

@InputType()
export class SearchBody {
  @Field(() => String)
  playlistId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerName: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => String)
  type: string;

  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class DeleteArgs {
  @Field(() => String)
  playlistId: string;
}
