import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchService } from './search.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'SEARCH_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: process.env.SEARCH_SERVICE,
          package: 'search',
          protoPath: 'protos/search.proto',
        },
      },
    ]),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
