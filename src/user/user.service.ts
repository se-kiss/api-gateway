import { Injectable, Inject } from '@nestjs/common';
import { UserGrpcService } from './user.grpc-service';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserArgs,
  GetUsersArgs,
  UpdateUserArgs,
  DeleteUserArgs,
} from './user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  private readonly userService: UserGrpcService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {
    this.userService = this.client.getService<UserGrpcService>('UserService');
  }

  async createUser(payload: CreateUserArgs): Promise<User> {
    return await this.userService.createUser(payload).toPromise();
  }

  async getUsers(payload: GetUsersArgs): Promise<User[]> {
    const { users } = await this.userService
      .getUsers(payload || {})
      .toPromise();
    return users || [];
  }

  async updateUser(payload: UpdateUserArgs): Promise<User> {
    return await this.userService.updateUser(payload).toPromise();
  }

  async deleteUser(payload: DeleteUserArgs): Promise<User> {
    return await this.userService.deleteUser(payload).toPromise();
  }
}
