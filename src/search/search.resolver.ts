import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { StatusCode, SearchBody } from './search.model';
import { SearchArgs } from './search.dto';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [SearchBody])
  async search(
    @Args({ name: 'args', type: () => SearchArgs }) args: SearchArgs,
  ): Promise<SearchBody[]> {
    return await this.searchService.search(args);
  }

  @Mutation(() => StatusCode)
  async clearIndex(): Promise<StatusCode> {
    return await this.searchService.clearIndex();
  }
}
