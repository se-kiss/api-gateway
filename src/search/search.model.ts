import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchBody {
  @Field(() => String)
  playlistId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerName: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => [String])
  types: string[];

  @Field(() => String, { nullable: true })
  description?: string;
}

@ObjectType()
export class StatusCode {
  @Field(() => Number)
  statusCode: number;
}
