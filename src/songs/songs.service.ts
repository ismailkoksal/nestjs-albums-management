import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongRepository } from './song.repository';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: SongRepository,
    private albumsService: AlbumsService,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { albumId } = createSongDto;
    const album = await this.albumsService.findOne(albumId);
    const song = this.songRepository.create({
      ...createSongDto,
      album,
    });
    return this.songRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException(`No song found with id: ${id}`);
    }
    return song;
  }

  async update(updateSongDto: UpdateSongDto): Promise<Song> {
    const { albumId } = updateSongDto;
    await this.findOne(updateSongDto.id);
    const album = await this.albumsService.findOne(albumId);
    const partialSong = await this.songRepository.preload({
      ...updateSongDto,
      album,
    });
    return this.songRepository.save(partialSong);
  }

  async remove(id: number): Promise<Song> {
    const album = await this.findOne(id);
    return this.songRepository.remove(album);
  }
}
