import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_SERVICE,
          package: 'user',
          protoPath: 'protos/user.proto',
        },
      },
    ]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
