import { Observable } from 'rxjs';
import { CreateIdentityArgs, LoginArgs } from './auth.dto';
import { Identity, Token } from './auth.model';

export interface AuthGrpcService {
  register(payload: CreateIdentityArgs): Observable<Identity>;
  login(payload: LoginArgs): Observable<Token>;
}
