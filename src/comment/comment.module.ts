import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'COMMENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.COMMENT_SERVICE,
          package: 'comment',
          protoPath: 'protos/comment.proto',
        },
      },
    ]),
  ],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
