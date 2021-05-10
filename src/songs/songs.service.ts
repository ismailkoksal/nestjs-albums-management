import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { SongRepository } from './song.repository';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class SongsService {
  private logger = new Logger(SongsService.name);

  constructor(
    @InjectRepository(Song) private songRepository: SongRepository,
    private albumsService: AlbumsService,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const { albumId } = createSongDto;
    try {
      const song = this.songRepository.create({
        ...createSongDto,
        album: { id: albumId },
      });
      return this.songRepository.save(song);
    } catch (e) {
      this.logger.warn(e);
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  findAllFromAlbum(albumId: number): Promise<Song[]> {
    return this.songRepository.find({ where: { album: { id: albumId } } });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOne(id);
    if (!song) {
      throw new NotFoundException(`No song found with id: ${id}`);
    }
    return song;
  }

  async update(updateSongDto: UpdateSongDto): Promise<Song> {
    await this.findOne(updateSongDto.id);
    const partialSong = await this.songRepository.preload(updateSongDto);
    return this.songRepository.save(partialSong);
  }

  async remove(id: number): Promise<Song> {
    const song = await this.findOne(id);
    return this.songRepository.remove(song);
  }
}
