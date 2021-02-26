import { ClientGrpc } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { ReactionGrpcService } from './reaction.grpc-service';
import {
  CreateReactionArgs,
  GetReactionsArgs,
  ReactionId,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';

@Injectable()
export class ReactionService {
  private reactionService: ReactionGrpcService;

  constructor(@Inject('REACTION_PACKAGE') private client: ClientGrpc) {
    this.reactionService = this.client.getService<ReactionGrpcService>(
      'ReactionService',
    );
  }

  async createReaction(payload: CreateReactionArgs): Promise<Reaction> {
    return await this.reactionService.createReaction(payload).toPromise();
  }

  async getReactions(payload: GetReactionsArgs): Promise<Reaction[]> {
    const { reactions } = await this.reactionService
      .getReactions(payload || {})
      .toPromise();
    return reactions || [];                                                                                                                                                                                                                                                                                                      
  }

  async deleteReaction(payload: ReactionId): Promise<Reaction> {
    return await this.reactionService.deleteReaction(payload).toPromise();
  }

  async upVote(payload: VoteArgs): Promise<Reaction> {
    return await this.reactionService.upVote(payload).toPromise();
  }

  async downVote(payload: VoteArgs): Promise<Reaction> {
    return await this.reactionService.downVote(payload).toPromise();
  }
}
