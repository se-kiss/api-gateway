import { ClientGrpc } from '@nestjs/microservices';
import { Injectable, Inject } from '@nestjs/common';
import { MediaGrpcService } from './media.grpc-service';
import {
  CreateMediaArgs,
  GetMediaArgs,
  UpdateMediaArgs,
  DeleteMediaArgs,
} from './media.dto';
import { Media } from './media.model';

@Injectable()
export class MediaService {
  private mediaService: MediaGrpcService;

  constructor(@Inject('MEDIA_PACKAGE') private client: ClientGrpc) {
    this.mediaService = this.client.getService<MediaGrpcService>(
      'MediaService',
    );
  }

  async createMedia(payload: CreateMediaArgs): Promise<Media> {
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
