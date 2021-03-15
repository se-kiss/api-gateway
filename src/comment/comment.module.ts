import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { UserModule } from '../user/user.module';

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
    forwardRef(() => UserModule),
  ],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
