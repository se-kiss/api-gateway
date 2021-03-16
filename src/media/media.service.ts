import { ClientGrpc } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { ApolloError } from 'apollo-server-errors';
import { MediaGrpcService } from './media.grpc-service';
import {
  CreateMediaArgs,
  GetMediaArgs,
  UpdateMediaArgs,
  DeleteMediaArgs,
} from './media.dto';
import { Media } from './media.model';
import { TagService } from '../tag/tag.service';

@Injectable()
export class MediaService {
  private mediaService: MediaGrpcService;

  constructor(
    @Inject('MEDIA_PACKAGE') private client: ClientGrpc,
    private readonly tagService: TagService,
  ) {
    this.mediaService = this.client.getService<MediaGrpcService>(
      'MediaService',
    );
  }

  async isDuplicateName(name: string, playlistId: string): Promise<boolean> {
    const mediaInPlaylist = await this.getMedia({
      filters: { playlistId: playlistId },
    });
    for (const media of mediaInPlaylist) {
      if (media.name === name) return true;
    }
    return false;
  }

  async defaultTagId(): Promise<string> {
    const defaultTag = await this.tagService.getTags({
      filter: { name: TagService.defaultTagName },
    });
    return defaultTag[0]._id;
  }

  async createMedia(payload: CreateMediaArgs): Promise<Media> {
    if (await this.isDuplicateName(payload.name, payload.playlistId))
      throw new ApolloError('Duplicate Media Name', 'DUPLICATE_FIELD');
    if (payload.tagIds.length === 0)
      payload.tagIds.push(await this.defaultTagId());
    return await this.mediaService.createMedia(payload).toPromise();
  }

  async getMedia(payload: GetMediaArgs): Promise<Media[]> {
    const { media } = await this.mediaService
      .getMedia(payload || {})
      .toPromise();
    return media || [];
  }

  async updateMedia(payload: UpdateMediaArgs): Promise<Media> {
    return await this.mediaService.updateMedia(payload).toPromise();
  }

  async deleteMedia(payload: DeleteMediaArgs): Promise<Media> {
    return await this.mediaService.deleteMedia(payload).toPromise();
  }
}
