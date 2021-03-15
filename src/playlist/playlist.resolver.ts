import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist.model';
import {
  GetPlaylistArgs,
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
  DeletePlaylistArgs,
} from './playlist.dto';
import { Media } from '../media/media.model';
import { MediaService } from '../media/media.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { TagService } from '../tag/tag.service';
import { Tag } from '../tag/tag.model';

@Resolver(() => Playlist)
export class PlaylistResolver {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly mediaService: MediaService,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  @Query(() => [Playlist])
  async playlists(
    @Args({ name: 'args', type: () => GetPlaylistArgs, nullable: true })
    args: GetPlaylistArgs,
  ): Promise<Playlist[]> {
    return await this.playlistService.getPlaylists(args);
  }

  @Mutation(() => Playlist)
  async createPlaylist(
    @Args({ name: 'args', type: () => CreatePlaylistArgs })
    args: CreatePlaylistArgs,
  ): Promise<Playlist> {
    return await this.playlistService.createPlaylist(args);
  }

  @Mutation(() => Playlist)
  async updatePlaylist(
    @Args({ name: 'args', type: () => UpdatePlaylistArgs })
    args: UpdatePlaylistArgs,
  ): Promise<Playlist> {
    return await this.playlistService.updatePlaylist(args);
  }

  @Mutation(() => Playlist)
  async deletePlaylist(
    @Args({ name: 'args', type: () => DeletePlaylistArgs })
    args: DeletePlaylistArgs,
  ): Promise<Playlist> {
    return await this.playlistService.deletePlaylist(args);
  }

  @ResolveField(() => [Media])
  async media(@Parent() { _id }: Playlist): Promise<Media[]> {
    return await this.mediaService.getMedia({ filters: { playlistId: _id } });
  }

  @ResolveField(() => User)
  async user(@Parent() { ownerId }: Playlist): Promise<User> {
    const res = await this.userService.getUsers({ ids: [ownerId] });
    return res[0];
  }

  @ResolveField(() => [Tag])
  async tags(@Parent() { _id }: Playlist): Promise<Tag[]> {
    const tagIds = [];
    const media = await this.mediaService.getMedia({
      filters: { playlistId: _id },
    });
    for (const each of media) {
      for (const tagId of each.tagIds) {
        if (!tagIds.includes(tagId)) tagIds.push(tagId);
      }
    }
    return await this.tagService.getTags({ ids: tagIds });
  }
}
