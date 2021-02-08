import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MediaModule } from './media/media.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      include: [PingModule, MediaModule, PlaylistModule, SearchModule],
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    PingModule,
    MediaModule,
    PlaylistModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
