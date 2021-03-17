import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SearchService } from './search.service';
import { StatusCode, SearchBody } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query(() => [String])
  async search(
    @Args({ name: 'args', type: () => SearchArgs }) args: SearchArgs,
  ): Promise<string[]> {
    return await this.searchService.search(args);
  }

  @Mutation(() => StatusCode)
  async indexMedia(
    @Args({ name: 'args', type: () => SearchBody }) args: SearchBody,
  ): Promise<StatusCode> {
    return await this.searchService.indexMedia(args);
  }

  @Mutation(() => StatusCode)
  async updateIndex(
    @Args({ name: 'args', type: () => SearchBody }) args: SearchBody,
  ): Promise<StatusCode> {
    return await this.searchService.update(args);
  }

  @Mutation(() => StatusCode)
  async removeIndex(
    @Args({ name: 'args', type: () => DeleteArgs }) args: DeleteArgs,
  ): Promise<StatusCode> {
    return await this.searchService.remove(args);
  }

  @Mutation(() => StatusCode)
  async clearIndex(): Promise<StatusCode> {
    return await this.searchService.clearIndex();
  }
}
