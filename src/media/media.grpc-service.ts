import { Observable } from 'rxjs';
import {
  CreateMediaArgs,
  GetMediaArgs,
  UpdateMediaArgs,
  DeleteMediaArgs,
} from './media.dto';
import { Media } from './media.model';

export interface MediaGrpcService {
  createMedia(payload: CreateMediaArgs): Observable<Media>;
  getMedia(payload: GetMediaArgs): Observable<{ media: Media[] }>;
  updateMedia(payload: UpdateMediaArgs): Observable<Media>;
  deleteMedia(payload: DeleteMediaArgs): Observable<Media>;
}
