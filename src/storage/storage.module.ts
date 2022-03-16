import { Module } from '@nestjs/common';
import { Client } from './s3client';
import { StorageService } from './storage.service';

@Module({
    exports:[StorageService,Client],
    providers:[StorageService,Client]
})
export class StorageModule {}
