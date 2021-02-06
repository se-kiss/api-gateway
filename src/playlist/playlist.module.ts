import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistResolver } from './playlist.resolver';

@Module({
  providers: [PlaylistService, PlaylistResolver]
})
export class PlaylistModule {}
