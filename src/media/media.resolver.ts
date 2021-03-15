import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MediaService } from './media.service';
import {
  GetMediaArgs,
  CreateMediaArgs,
  UpdateMediaArgs,
  DeleteMediaArgs,
} from './media.dto';
import { Media } from './media.model';
import { Tag } from '../tag/tag.model';
import { TagService } from '../tag/tag.service';
import { PlaylistService } from '../playlist/playlist.service';
import { Playlist } from '../playlist/playlist.model';

@Resolver(() => Media)
export class MediaResolver {
  constructor(
    private readonly mediaService: MediaService,
    private readonly tagService: TagService,
    private readonly playlistService: PlaylistService,
  ) {}

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

  @ResolveField(() => [Tag])
  async tags(@Parent() { tagIds }: Media): Promise<Tag[]> {
    return await this.tagService.getTags({ ids: tagIds });
  }

  @ResolveField(() => Playlist)
  async playlist(@Parent() { playlistId }: Media): Promise<Playlist> {
    const res = await this.playlistService.getPlaylists({ ids: [playlistId] });
    return res[0];
  }
}
