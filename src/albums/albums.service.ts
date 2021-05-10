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

  findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  findArtistAll(artistId: number): Promise<Album[]> {
    return this.albumRepository.find({ where: { artist: { id: artistId } } });
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new NotFoundException(`No album found with id: ${id}`);
    }
    return album;
  }

  async update(updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(updateAlbumDto.id);
    const partialAlbum = await this.albumRepository.preload(updateAlbumDto);
    return this.albumRepository.save(partialAlbum);
  }

  async remove(id: number): Promise<Album> {
    const album = await this.findOne(id);
    return this.albumRepository.remove(album);
  }
}
