import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';
import { TagModule } from '../tag/tag.module';
import { PlaylistModule } from '../playlist/playlist.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MEDIA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MEDIA_SERVICE,
          package: 'media',
          protoPath: 'protos/media.proto',
        },
      },
    ]),
    forwardRef(() => TagModule),
    forwardRef(() => PlaylistModule),
    forwardRef(() => CommentModule),
  ],
  providers: [MediaService, MediaResolver],
  exports: [MediaService],
})
export class MediaModule {}
