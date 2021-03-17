import { Injectable, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { SearchGrpcService } from './search.grpc-service';
import { SearchBody, StatusCode } from './search.model';
import { SearchArgs, DeleteArgs } from './search.dto';
import { TagService } from '../tag/tag.service';
import { MediaService } from '../media/media.service';

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
    if (!payload.tags || payload.tags.length === 0)
      for (const tag of TagService.defaultTags) payload.tags.push(tag);
    if (!payload.types || payload.types.length === 0)
      for (const type of MediaService.defaultTypes) payload.types.push(type);
    const { playlistIds } = await this.searchService
      .search(payload)
      .toPromise();
    return playlistIds || [];
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
