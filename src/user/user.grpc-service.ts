import { Observable } from 'rxjs';
import {
  CreateUserArgs,
  GetUsersArgs,
  UpdateUserArgs,
  DeleteUserArgs,
} from './user.dto';
import { User } from './user.model';

export interface UserGrpcService {
  createUser(payload: CreateUserArgs): Observable<User>;
  getUsers(payload: GetUsersArgs): Observable<{ users: User[] }>;
  updateUser(payload: UpdateUserArgs): Observable<User>;
  deleteUser(payload: DeleteUserArgs): Observable<User>;
}
