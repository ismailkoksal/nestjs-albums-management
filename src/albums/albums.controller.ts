import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { FindOneParams } from '../shared/dto/find-one-params.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll(): Promise<Album[]> {
    return this.albumsService.findAll();
  }

  @Get('artist/:id')
  findArtistAll(@Param() params: FindOneParams): Promise<Album[]> {
    return this.albumsService.findArtistAll(params.id);
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<Album> {
    return this.albumsService.findOne(params.id);
  }

  @Patch()
  update(@Body() updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.albumsService.update(updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams): Promise<Album> {
    return this.albumsService.remove(params.id);
  }
}
