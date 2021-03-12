import { Observable } from 'rxjs';
import {
  CreateCommentArgs,
  GetCommentsArgs,
  CommentsForMediaArgs,
  UpdateCommentArgs,
  DeleteCommentArgs,
} from './comment.dto';
import { Comment, CommentForMedia } from './comment.model';

export interface CommentGrpcService {
  createComment(payload: CreateCommentArgs): Observable<Comment>;
  getComments(payload: GetCommentsArgs): Observable<{ comments: Comment[] }>;
  commentsForMedia(
    payload: CommentsForMediaArgs,
  ): Observable<{ comments: CommentForMedia[] }>;
  updateComment(payload: UpdateCommentArgs): Observable<Comment>;
  deleteComment(payload: DeleteCommentArgs): Observable<Comment>;
}
