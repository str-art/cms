import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth.module/auth.module';
import { ContentModule } from './content.module/content.module';
import { EventModule } from './event.module/event.module';
import { PlaylistModule } from './playlist.module/playlist.module';
import { ScreenModule } from './screen.module/screen.module';
import { UserModule } from './user.module/user.module';
import { StorageModule } from './storage/storage.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    ScreenModule,
    ContentModule,
    EventModule,
    PlaylistModule,
    StorageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
