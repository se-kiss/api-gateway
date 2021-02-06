import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MediaService } from './media.service';
import { MediaResolver } from './media.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'MEDIA_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MEDIA_SERVICE,
          package: 'media',
          protoPath: 'protos/media.proto',
        },
      },
    ]),
  ],
  providers: [MediaService, MediaResolver],
})
export class MediaModule {}
