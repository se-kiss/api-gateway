import { Resolver, Mutation } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { StatusCode } from './search.model';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Mutation(() => StatusCode)
  async clearIndex(): Promise<StatusCode> {
    return await this.searchService.clearIndex();
  }
}
