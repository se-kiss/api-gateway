import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.AUTH_SERVICE,
          package: 'auth',
          protoPath: 'protos/auth.proto',
        },
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [AuthResolver, AuthService, AuthGuard],
})
export class AuthModule {}
