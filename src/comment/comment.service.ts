import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CommentGrpcService } from './comment.grpc-service';
import {
  CreateCommentArgs,
  GetCommentsArgs,
  UpdateCommentArgs,
  DeleteCommentArgs,
  CommentsForMediaArgs,
} from './comment.dto';
import { Comment, CommentForMedia } from './comment.model';

@Injectable()
export class CommentService {
  private commentService: CommentGrpcService;

  constructor(@Inject('COMMENT_PACKAGE') private client: ClientGrpc) {
    this.commentService = this.client.getService<CommentGrpcService>(
      'CommentService',
    );
  }

  async createComment(payload: CreateCommentArgs): Promise<Comment> {
    return await this.commentService.createComment(payload).toPromise();
  }

  async getComments(payload: GetCommentsArgs): Promise<Comment[]> {
    const { comments } = await this.commentService
      .getComments(payload || {})
      .toPromise();
    return comments || [];
  }

  async commentsForMedia(
    payload: CommentsForMediaArgs,
  ): Promise<CommentForMedia[]> {
    const { comments } = await this.commentService
      .commentsForMedia(payload)
      .toPromise();
    return comments || [];
  }

  async updateComment(payload: UpdateCommentArgs): Promise<Comment> {
    return await this.commentService.updateComment(payload).toPromise();
  }

  async deleteComment(payload: DeleteCommentArgs): Promise<Comment> {
    return await this.commentService.deleteComment(payload).toPromise();
  }
}
