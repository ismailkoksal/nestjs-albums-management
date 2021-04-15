import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all songs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
