import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm'
import { PropertiesModule } from './properties.module/properties.module';

import { UserModule } from './user.module/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PropertiesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
