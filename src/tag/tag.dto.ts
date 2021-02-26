import { InputType, Field } from '@nestjs/graphql';
import { Tag } from './tag.model';

@InputType()
export class CreateTagArgs
  implements Omit<Tag, '_id' | '_createdAt' | '_updatedAt'> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  color: string;
}

@InputType()
export class UpdateTagArgs
  implements Omit<Tag, 'name' | '_createdAt' | '_updatedAt' | '_id'> {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  color: string;
}

@InputType()
export class GetTagsArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];
}

@InputType()
export class DeleteTagArgs {
  @Field(() => String)
  _id: string;
}
