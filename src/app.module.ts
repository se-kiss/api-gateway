import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PingModule } from './ping/ping.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      include: [PingModule],
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    PingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
