import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionResolver } from './subscription.resolver';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SUBSCRIPTION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.SUBSCRIPTION_SERVICE,
          package: 'subscription',
          protoPath: 'protos/subscription.proto',
        },
      },
    ]),
  ],
  providers: [SubscriptionService, SubscriptionResolver],
})
export class SubscriptionModule {}
