import { Observable } from 'rxjs';
import {
  CreateReactionArgs,
  GetReactionsArgs,
  ReactionId,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';

export interface ReactionGrpcService {
  createReaction(payload: CreateReactionArgs): Observable<Reaction>;
  getReactions(payload: GetReactionsArgs): Observable<{ reaction: Reaction[] }>;
  deleteReaction(payload: ReactionId): Observable<Reaction>;
  upVote(payload: VoteArgs): Observable<Reaction>;
  downVote(payload: VoteArgs): Observable<Reaction>;
}
