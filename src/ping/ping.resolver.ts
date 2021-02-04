import { Resolver, Query } from '@nestjs/graphql';
import { PingService } from './ping.service';

@Resolver('Ping')
export class PingResolver {
  constructor(private readonly pingService: PingService) {}

  @Query(() => String)
  async ping(): Promise<string> {
    return this.pingService.getHello();
  }
}
