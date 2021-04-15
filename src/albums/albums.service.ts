import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumRepository } from './album.repository';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepository: AlbumRepository,
    private artistsService: ArtistsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId } = createAlbumDto;
    const artist = await this.artistsService.findOne(artistId);
    const album = this.albumRepository.create({
      ...createAlbumDto,
      artist,
    });
    return this.albumRepository.save(album);
  }

  findAll() {
    return `This action returns all albums`;
  }

  findOne(id: number): Promise<Album> {
    const album = this.albumRepository.findOne(id);
    if (!album) {
      throw new NotFoundException(`No album found with id: ${id}`);
    }
    return album;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return `This action updates a #${id} album`;
  }

  remove(id: number) {
    return `This action removes a #${id} album`;
  }
}
