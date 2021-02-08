import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MediaModule } from './media/media.module';
import { PlaylistModule } from './playlist/playlist.module';
<<<<<<< Updated upstream
=======
import { ReactionModule } from './reaction/reaction.module';
import { SearchModule } from './search/search.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
<<<<<<< Updated upstream
      include: [PingModule, MediaModule, PlaylistModule],
=======
      include: [
        PingModule,
        MediaModule,
        PlaylistModule,
        ReactionModule,
        SearchModule,
      ],
>>>>>>> Stashed changes
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    PingModule,
    MediaModule,
    PlaylistModule,
<<<<<<< Updated upstream
=======
    ReactionModule,
    SearchModule,
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
