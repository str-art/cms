import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertiesModule } from './properties.module/properties.module';
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
      "logging": "all"
    }),
    UserModule,
    PropertiesModule,
    JwtModule.register({secret: jwtConstants.secret}),
    PassportModule,
    Seeder
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
