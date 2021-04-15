import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Type(() => Boolean)
  isBand: boolean;
}
