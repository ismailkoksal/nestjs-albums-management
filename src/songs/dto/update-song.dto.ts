import { PartialType, IntersectionType, OmitType } from '@nestjs/mapped-types';
import { CreateSongDto } from './create-song.dto';
import { FindOneParams } from '../../shared/dto/find-one-params.dto';

export class UpdateSongDto extends IntersectionType(
  FindOneParams,
  PartialType(OmitType(CreateSongDto, ['albumId'] as const)),
) {}
