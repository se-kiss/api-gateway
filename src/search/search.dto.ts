import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SearchArgs {
  @Field(() => String)
  text: string;

  @Field(() => Number)
  from: number;

  @Field(() => Number)
  size: number;
}

@InputType()
export class DeleteArgs {
  @Field(() => String)
  playlistId: string;
}
