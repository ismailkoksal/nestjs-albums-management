import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistRepository: ArtistRepository,
  ) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistRepository.create(createArtistDto);
    return this.artistRepository.save(artist);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException(`No artist found with id: ${id}`);
    }
    return artist;
  }

  async update(updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(updateArtistDto.id);
    const partialArtist = await this.artistRepository.preload(updateArtistDto);
    return this.artistRepository.save(partialArtist);
  }

  async remove(id: number): Promise<Artist> {
    const artist = await this.findOne(id);
    return this.artistRepository.remove(artist);
  }
}
