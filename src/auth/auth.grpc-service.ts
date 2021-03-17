import { Observable } from 'rxjs';
import { CreateIdentityArgs, LoginArgs, VerifyArgs } from './auth.dto';
import { Identity, Token, Decoded } from './auth.model';

export interface AuthGrpcService {
  register(payload: CreateIdentityArgs): Observable<Identity>;
  login(payload: LoginArgs): Observable<Token>;
}
