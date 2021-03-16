import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { MediaModule } from '../media/media.module';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PLAYLIST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.PLAYLIST_SERVICE,
          package: 'playlist',
          protoPath: 'protos/playlist.proto',
        },
      },
    ]),
    forwardRef(() => MediaModule),
    forwardRef(() => UserModule),
    forwardRef(() => TagModule),
  ],
  providers: [PlaylistService, PlaylistResolver],
  exports: [PlaylistService],
})
export class PlaylistModule {}
