import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PlaylistGrpcService } from './playlist.grpc-service';
import {
  CreatePlaylistArgs,
  GetPlaylistArgs,
  UpdatePlaylistArgs,
  DeletePlaylistArgs,
} from './playlist.dto';
import { Playlist } from './playlist.model';

@Injectable()
export class PlaylistService {
  private playlistService: PlaylistGrpcService;

  constructor(@Inject('PLAYLIST_PACKAGE') private client: ClientGrpc) {
    this.playlistService = this.client.getService<PlaylistGrpcService>(
      'PlaylistService',
    );
  }

  async createPlaylist(payload: CreatePlaylistArgs): Promise<Playlist> {
    return await this.playlistService.createPlaylist(payload).toPromise();
  }

  async getPlaylists(payload: GetPlaylistArgs): Promise<Playlist[]> {
    const { playlists } = await this.playlistService
      .getPlaylists(payload || {})
      .toPromise();
    return playlists || [];
  }

  async updatePlaylist(payload: UpdatePlaylistArgs): Promise<Playlist> {
    return await this.playlistService.updatePlaylist(payload).toPromise();
  }

  async deletePlaylist(payload: DeletePlaylistArgs): Promise<Playlist> {
    return await this.playlistService.deletePlaylist(payload).toPromise();
  }
}
