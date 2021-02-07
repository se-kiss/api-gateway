import { Observable } from 'rxjs';
import {
  CreatePlaylistArgs,
  UpdatePlaylistArgs,
  DeletePlaylistArgs,
  GetPlaylistArgs,
} from './playlist.dto';
import { Playlist } from './playlist.model';

export interface PlaylistGrpcService {
  createPlaylist(payload: CreatePlaylistArgs): Observable<Playlist>;
  getPlaylists(payload: GetPlaylistArgs): Observable<{ playlists: Playlist[] }>;
  updatePlaylist(payload: UpdatePlaylistArgs): Observable<Playlist>;
  deletePlaylist(payload: DeletePlaylistArgs): Observable<Playlist>;
}
