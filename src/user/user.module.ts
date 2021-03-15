import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PlaylistModule } from '../playlist/playlist.module';
import { CommentModule } from '../comment/comment.module';

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
    forwardRef(() => PlaylistModule),
    forwardRef(() => CommentModule),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
