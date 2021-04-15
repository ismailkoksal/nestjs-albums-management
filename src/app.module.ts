import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, AlbumsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
