import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UsersModule,
    AlbumsModule,
    ArtistsModule,
    SongsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
