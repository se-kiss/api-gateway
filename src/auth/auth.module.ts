import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.gaurd';

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
  ],
  providers: [AuthResolver, AuthService, AuthGuard],
})
export class AuthModule {}
