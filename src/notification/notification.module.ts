import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'NOTIFICATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE,
          package: 'notification',
          protoPath: 'protos/notification.proto',
        },
      },
    ]),
    forwardRef(() => UserModule),
  ],
  providers: [NotificationService, NotificationResolver],
})
export class NotificationModule {}