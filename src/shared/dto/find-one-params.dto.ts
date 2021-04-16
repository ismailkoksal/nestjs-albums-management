import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class FindOneParams {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
