import { InputType, Field } from '@nestjs/graphql';
import { Media, MediaType } from './media.model';

@InputType()
export class CreateMediaArgs
  implements Omit<Media, '_createdAt' | '_updatedAt' | '_id'> {
  @Field(() => String)
  playlistId: string;

  @Field(() => [String])
  tagIds: string[];

  @Field(() => String)
  name: string;

  @Field(() => MediaType)
  type: MediaType;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => [String], { nullable: true })
  paragraph?: string[];

  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class UpdateMediaArgs
  implements Partial<Omit<Media, 'playlistId' | '_createdAt' | '_updatedAt'>> {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => [String], { nullable: true })
  paragraph?: string[];

  @Field(() => String, { nullable: true })
  description?: string;
}

@InputType()
export class GetMediaFilter {
  @Field(() => String, { nullable: true })
  playlistId?: string;

  @Field(() => [String], { nullable: true })
  tagIds?: string[];

  @Field(() => MediaType, { nullable: true })
  type?: MediaType;
}

@InputType()
export class GetMediaArgs {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => GetMediaFilter, { nullable: true })
  filter?: GetMediaFilter;
}

@InputType()
export class DeleteMediaArgs {
  @Field(() => String)
  _id: string;
}
