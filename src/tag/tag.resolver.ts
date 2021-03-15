import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import {
  GetTagsArgs,
  CreateTagArgs,
  UpdateTagArgs,
  DeleteTagArgs,
} from './tag.dto';
import { Tag } from './tag.model';
import { Media } from '../media/media.model';
import { MediaService } from '../media/media.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(
    private readonly tagService: TagService,
    private readonly mediaService: MediaService,
  ) {}

  @Query(() => [Tag])
  async tag(
    @Args({ name: 'args', type: () => GetTagsArgs, nullable: true })
    args: GetTagsArgs,
  ): Promise<Tag[]> {
    return await this.tagService.getTags(args);
  }

  @Mutation(() => Tag)
  async createTag(
    @Args({ name: 'args', type: () => CreateTagArgs }) args: CreateTagArgs,
  ): Promise<Tag> {
    return await this.tagService.createTag(args);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Args({ name: 'args', type: () => UpdateTagArgs }) args: UpdateTagArgs,
  ): Promise<Tag> {
    return await this.tagService.updateTag(args);
  }

  @Mutation(() => Tag)
  async deleteTag(
    @Args({ name: 'args', type: () => DeleteTagArgs }) args: DeleteTagArgs,
  ): Promise<Tag> {
    return await this.tagService.deleteTag(args);
  }

  @ResolveField(() => [Media])
  async media(@Parent() { _id }: Tag): Promise<Media[]> {
    return await this.mediaService.getMedia({ filters: { tagIds: [_id] } });
  }
}
