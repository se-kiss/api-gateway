import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist.model';
import {
  GetPlaylistArgs,
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
  DeletePlaylistArgs,
} from './playlist.dto';

@Resolver()
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

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
}
