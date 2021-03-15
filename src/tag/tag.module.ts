import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TAG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.MEDIA_SERVICE,
          package: 'tag',
          protoPath: 'protos/tag.proto',
        },
      },
    ]),
    forwardRef(() => MediaModule),
  ],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
