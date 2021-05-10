import { PartialType, IntersectionType, OmitType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { FindOneParams } from '../../shared/dto/find-one-params.dto';

export class UpdateAlbumDto extends IntersectionType(
  FindOneParams,
  PartialType(OmitType(CreateAlbumDto, ['artistId'] as const)),
) {}
