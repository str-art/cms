import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertiesModule } from './properties.module/properties.module';
import { jwtConstants } from './user.module/jwt.constants';
import { UserModule } from './user.module/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PropertiesModule,
    JwtModule.register({secret: jwtConstants.secret}),
    PassportModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
