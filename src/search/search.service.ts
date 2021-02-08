import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SearchGrpcService } from './search.grpc-service';
import { SearchBody } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';
import { SearchResult } from './search.interface';

@Injectable()
export class SearchService {
  private searchService: SearchGrpcService;

  constructor(@Inject('SEARCH_PACKAGE') private client: ClientGrpc) {
    this.searchService = this.client.getService<SearchGrpcService>(
      'SearchService',
    );
  }

  async indexMedia(payload: SearchBody): Promise<{ statusCode: number }> {
    return await this.searchService.indexMedia(payload).toPromise();
  }

  async search(payload: SearchArgs): Promise<{ res: SearchResult[] }> {
    return await this.searchService.search(payload).toPromise();
  }

  async update(payload: SearchBody): Promise<{ statusCode: number }> {
    return await this.searchService.update(payload).toPromise();
  }

  async remove(payload: DeleteArgs): Promise<{ statusCode: number }> {
    return await this.searchService.remove(payload).toPromise();
  }

  async clearIndex(): Promise<{ statusCode: number }> {
    return await this.searchService.clearIndex({}).toPromise();
  }
}
