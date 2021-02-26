import { Injectable, Inject } from '@nestjs/common';
import { TagGrpcService } from './tag.grpc-service';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateTagArgs,
  GetTagsArgs,
  UpdateTagArgs,
  DeleteTagArgs,
} from './tag.dto';
import { Tag } from './tag.model';

@Injectable()
export class TagService {
  private readonly tagService: TagGrpcService;

  constructor(@Inject('TAG_PACKAGE') private client: ClientGrpc) {
    this.tagService = this.client.getService<TagGrpcService>('TagService');
  }

  async createTag(payload: CreateTagArgs): Promise<Tag> {
    return await this.tagService.createTag(payload).toPromise();
  }

  async getTags(payload: GetTagsArgs): Promise<Tag[]> {
    const { tags } = await this.tagService.getTags(payload || {}).toPromise();
    return tags || [];
  }

  async updateTag(payload: UpdateTagArgs): Promise<Tag> {
    return await this.tagService.updateTag(payload).toPromise();
  }

  async deleteTag(payload: DeleteTagArgs): Promise<Tag> {
    return await this.tagService.deleteTag(payload).toPromise();
  }
}
