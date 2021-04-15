import { EntityRepository, Repository } from 'typeorm';
import { Album } from './entities/album.entity';

@EntityRepository(Album)
export class AlbumRepository extends Repository<Album> {}
