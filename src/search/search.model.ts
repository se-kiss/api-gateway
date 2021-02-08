import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SearchBody {
  @Field(() => String)
  mediaId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  ownerName: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  content?: string;
}

