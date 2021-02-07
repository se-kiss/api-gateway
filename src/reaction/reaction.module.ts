import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'REACTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MEDIA_SERVICE,
          package: 'reaction',
          protoPath: 'protos/reaction.proto',
        },
      },
    ]),
  ],
  providers: [ReactionService, ReactionResolver]
})
export class ReactionModule {}
