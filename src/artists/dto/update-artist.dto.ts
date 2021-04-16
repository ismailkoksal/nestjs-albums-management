import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { FindOneParams } from '../../shared/dto/find-one-params.dto';

export class UpdateArtistDto extends IntersectionType(
  FindOneParams,
  PartialType(CreateArtistDto),
) {}
