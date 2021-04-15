import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Song } from '../../songs/entities/song.entity';
import { Artist } from '../../artists/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('year')
  year: number;

  @Column()
  cover: string;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
