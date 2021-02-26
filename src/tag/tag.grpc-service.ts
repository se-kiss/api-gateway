import { Observable } from 'rxjs';
import {
  CreateTagArgs,
  GetTagsArgs,
  UpdateTagArgs,
  DeleteTagArgs,
} from './tag.dto';
import { Tag } from './tag.model';

export interface TagGrpcService {
  createTag(payload: CreateTagArgs): Observable<Tag>;
  getTags(payload: GetTagsArgs): Observable<{ tags: Tag[] }>;
  updateTag(payload: UpdateTagArgs): Observable<Tag>;
  deleteTag(payload: DeleteTagArgs): Observable<Tag>;
}
