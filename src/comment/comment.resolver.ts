import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment, CommentForMedia } from './comment.model';
import {
  GetCommentsArgs,
  CommentsForMediaArgs,
  CreateCommentArgs,
  UpdateCommentArgs,
  DeleteCommentArgs,
} from './comment.dto';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { MediaService } from '../media/media.service';
import { Media } from '../media/media.model';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
  ) {}

  @Query(() => [Comment])
  async comments(
    @Args({ name: 'args', type: () => GetCommentsArgs, nullable: true })
    args: GetCommentsArgs,
  ): Promise<Comment[]> {
    return await this.commentService.getComments(args);
  }

  @Query(() => [CommentForMedia])
  async commentsForMedia(
    @Args({ name: 'args', type: () => CommentsForMediaArgs })
    args: CommentsForMediaArgs,
  ): Promise<CommentForMedia[]> {
    return await this.commentService.commentsForMedia(args);
  }

  @Mutation(() => Comment)
  async createComment(
    @Args({ name: 'args', type: () => CreateCommentArgs })
    args: CreateCommentArgs,
  ): Promise<Comment> {
    return await this.commentService.createComment(args);
  }

  @Mutation(() => Comment)
  async updateComment(
    @Args({ name: 'args', type: () => UpdateCommentArgs })
    args: UpdateCommentArgs,
  ): Promise<Comment> {
    return await this.commentService.updateComment(args);
  }

  @Mutation(() => Comment)
  async deleteComment(
    @Args({ name: 'args', type: () => DeleteCommentArgs })
    args: DeleteCommentArgs,
  ): Promise<Comment> {
    return await this.commentService.deleteComment(args);
  }

  @ResolveField(() => User)
  async user(@Parent() { userId }: Comment): Promise<User> {
    const res = await this.userService.getUsers({ ids: [userId] });
    return res[0];
  }

  @ResolveField(() => Media)
  async media(@Parent() { mediaId }: Comment): Promise<Media> {
    const res = await this.mediaService.getMedia({ ids: [mediaId] });
    return res[0];
  }
}
