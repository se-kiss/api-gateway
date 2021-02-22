import { Observable } from 'rxjs';
import {
  CreateReactionArgs,
  GetReactionsArgs,
  ReactionId,
  Reactions,
  VoteArgs,
} from './reaction.dto';
import { Reaction } from './reaction.model';

export interface ReactionGrpcService {
  createReaction(payload: CreateReactionArgs): Observable<Reaction>;
  getReactions(payload: GetReactionsArgs): Observable<Reactions>;
  deleteReaction(payload: ReactionId): Observable<Reaction>;
  upVote(payload: VoteArgs): Observable<Reaction>;
  downVote(payload: VoteArgs): Observable<Reaction>;
}
