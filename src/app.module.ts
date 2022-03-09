import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth.module/auth.module';
import { ContentModule } from './content.module/content.module';
import { EventModule } from './event.module/event.module';
import { PlaylistModule } from './playlist.module/playlist.module';
import { ScreenModule } from './screen.module/screen.module';
import { Seeder } from './seeder..module/seeder.module';

import { jwtConstants } from './user.module/jwt.constants';
import { UserModule } from './user.module/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.POSTGRES_HOST,
      "port": 5432,
      "username": "postgres",
      "password":"CMS",
      "database": "cms",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true,
      "logging": "all",
      "subscribers": ["dist/**/*.subscriber{.ts,.js}"]
    }),
    JwtModule.register({secret: jwtConstants.secret}),
    AuthModule,
    UserModule,
    ScreenModule,
    ContentModule,
    EventModule,
    PlaylistModule,
    Seeder
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
