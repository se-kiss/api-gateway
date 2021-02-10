import { ClientGrpc } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { ReactionGrpcService } from './reaction.grpc-service';
import { CreateReactionArgs, ReactionId, UpdateReactionArgs, VoteArgs } from './reaction.dto';
import { Reaction } from './reaction.model';

@Injectable()
export class ReactionService {
  private reactionService: ReactionGrpcService;

  constructor(@Inject('REACTION_PACKAGE') private client: ClientGrpc) {
    this.reactionService = this.client.getService<ReactionGrpcService>('ReactionService');
  }

  async createReaction(payload: CreateReactionArgs): Promise<Reaction> {
    return await this.reactionService.createReaction(payload).toPromise();
  }

  async getReaction(payload: ReactionId): Promise<Reaction[]> {
    const { reaction } = await this.reactionService
      .getReaction(payload)
      .toPromise();
    return reaction || [];
  }

  async updateReaction(payload: UpdateReactionArgs): Promise<Reaction> {
    return await this.reactionService.updateReaction(payload).toPromise();
  }

  async deleteReaction(payload: ReactionId): Promise<Reaction> {
    return await this.reactionService.deleteReaction(payload).toPromise();
  }

  async upVote(payload: VoteArgs): Promise<Reaction>{
    return await this.reactionService.upVote(payload).toPromise();
  }

  async downVote(payload: VoteArgs): Promise<Reaction>{
    return await this.reactionService.downVote(payload).toPromise();
  }
}
