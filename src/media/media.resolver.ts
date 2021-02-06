import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MediaService } from './media.service';
import {
  GetMediaArgs,
  CreateMediaArgs,
  UpdateMediaArgs,
  DeleteMediaArgs,
} from './media.dto';
import { Media } from './media.model';

@Resolver()
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  async media(
    @Args({ name: 'args', type: () => GetMediaArgs, nullable: true })
    args: GetMediaArgs,
  ): Promise<Media[]> {
    return await this.mediaService.getMedia(args);
  }

  @Mutation(() => Media)
  async createMedia(
    @Args({ name: 'args', type: () => CreateMediaArgs }) args: CreateMediaArgs,
  ): Promise<Media> {
    return await this.mediaService.createMedia(args);
  }

  @Mutation(() => Media)
  async updateMedia(
    @Args({ name: 'args', type: () => UpdateMediaArgs }) args: UpdateMediaArgs,
  ): Promise<Media> {
    return await this.mediaService.updateMedia(args);
  }

  @Mutation(() => Media)
  async deleteMedia(
    @Args({ name: 'args', type: () => DeleteMediaArgs }) args: DeleteMediaArgs,
  ): Promise<Media> {
    return await this.mediaService.deleteMedia(args);
  }
}
