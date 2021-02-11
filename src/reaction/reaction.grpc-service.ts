import { Observable } from 'rxjs';
import {
  CreateReactionArgs,
  UpdateReactionArgs,
  ReactionId,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';

export interface ReactionGrpcService {
  createReaction(payload: CreateReactionArgs): Observable<Reaction>;
  getReaction(payload: ReactionId): Observable<{ reaction: Reaction[] }>;
  updateReaction(payload: UpdateReactionArgs): Observable<Reaction>;
  deleteReaction(payload: ReactionId): Observable<Reaction>;
  upVote(payload: VoteArgs): Observable<Reaction>;
  downVote(payload: VoteArgs): Observable<Reaction>;
}
