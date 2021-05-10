import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { FindOneParams } from '../shared/dto/find-one-params.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<Song[]> {
    return this.songsService.findAll();
  }

  @Get('album/:id')
  findAllFromAlbum(@Param() params: FindOneParams): Promise<Song[]> {
    return this.songsService.findAllFromAlbum(params.id);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Song> {
    return this.songsService.findOne(params.id);
  }

  @Patch()
  update(@Body() updateSongDto: UpdateSongDto): Promise<Song> {
    return this.songsService.update(updateSongDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams): Promise<Song> {
    return this.songsService.remove(params.id);
  }
}
