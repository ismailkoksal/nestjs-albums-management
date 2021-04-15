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

  findAll() {
    return `This action returns all artists`;
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException(`No artist found with id: ${id}`);
    }
    return artist;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
