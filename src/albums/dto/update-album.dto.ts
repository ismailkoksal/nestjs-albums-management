import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { FindOneParams } from '../../shared/dto/find-one-params.dto';

export class UpdateAlbumDto extends IntersectionType(
  FindOneParams,
  PartialType(CreateAlbumDto),
) {}
