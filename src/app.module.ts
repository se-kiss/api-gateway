import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';
import { MediaModule } from './media/media.module';
import { PlaylistModule } from './playlist/playlist.module';
import { SearchModule } from './search/search.module';
import { ReactionModule } from './reaction/reaction.module';
import { TagModule } from './tag/tag.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      include: [
        PingModule,
        MediaModule,
        PlaylistModule,
        ReactionModule,
        SearchModule,
        TagModule,
        NotificationModule,
        SubscriptionModule,
        UserModule,
        CommentModule,
      ],
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    PingModule,
    MediaModule,
    PlaylistModule,
    SearchModule,
    ReactionModule,
    TagModule,
    NotificationModule,
    SubscriptionModule,
    UserModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
