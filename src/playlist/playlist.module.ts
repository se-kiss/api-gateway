import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'PLAYLIST_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MEDIA_SERVICE,
          package: 'playlist',
          protoPath: 'protos/playlist.proto',
        },
      },
    ]),
  ],
  providers: [PlaylistService, PlaylistResolver],
})
export class PlaylistModule {}
