import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [UsersModule, AlbumsModule, ArtistsModule, SongsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
