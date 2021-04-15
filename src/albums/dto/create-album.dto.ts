import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  cover: string;

  @IsNotEmpty()
  artistId: number;
}
