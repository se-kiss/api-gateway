import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SearchGrpcService } from './search.grpc-service';
import { SearchBody, StatusCode } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';

@Injectable()
export class SearchService {
  private searchService: SearchGrpcService;

  constructor(@Inject('SEARCH_PACKAGE') private client: ClientGrpc) {
    this.searchService = this.client.getService<SearchGrpcService>(
      'SearchService',
    );
  }

  async indexMedia(payload: SearchBody): Promise<StatusCode> {
    return await this.searchService.indexMedia(payload).toPromise();
  }

  async search(payload: SearchArgs): Promise<string[]> {
    const { res } = await this.searchService.search(payload).toPromise();
    return res || [];
  }

  async update(payload: SearchBody): Promise<StatusCode> {
    return await this.searchService.update(payload).toPromise();
  }

  async remove(payload: DeleteArgs): Promise<StatusCode> {
    return await this.searchService.remove(payload).toPromise();
  }

  async clearIndex(): Promise<StatusCode> {
    return await this.searchService.clearIndex({}).toPromise();
  }
}
