import { forwardRef, Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionResolver } from './reaction.resolver';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'REACTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.REACTION_SERVICE,
          package: 'reaction',
          protoPath: 'protos/reaction.proto',
        },
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [ReactionService, ReactionResolver],
})
export class ReactionModule {}
