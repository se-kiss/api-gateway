import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'TAG_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.TAG_SERVICE,
          package: 'tag',
          protoPath: 'protos/tag.proto',
        },
      },
    ]),
  ],
  providers: [TagService, TagResolver],
})
export class TagModule {}
