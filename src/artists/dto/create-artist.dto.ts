import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isBand: boolean;
}
