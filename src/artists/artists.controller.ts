import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { FindOneParams } from '../shared/dto/find-one-params.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Artist> {
    return this.artistsService.findOne(params.id);
  }

  @Patch()
  update(@Body() updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistsService.update(updateArtistDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams): Promise<Artist> {
    return this.artistsService.remove(params.id);
  }
}
