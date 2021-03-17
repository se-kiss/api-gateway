import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGrpcService } from './auth.grpc-service';
import { CreateIdentityArgs, LoginArgs } from './auth.dto';
import { Token, Identity } from './auth.model';

@Injectable()
export class AuthService {
  private readonly authService: AuthGrpcService;
  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {
    this.authService = this.client.getService<AuthGrpcService>('AuthService');
  }

  async register(payload: CreateIdentityArgs): Promise<Identity> {
    return await this.authService.register(payload).toPromise();
  }

  async login(payload: LoginArgs): Promise<Token> {
    return await this.authService.login(payload).toPromise();
  }
}
