import { PartialType, IntersectionType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { FindOneParams } from '../../shared/dto/find-one-params.dto';

export class UpdateUserDto extends IntersectionType(
  FindOneParams,
  PartialType(CreateUserDto),
) {}
