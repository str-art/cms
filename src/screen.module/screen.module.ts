import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth.module/auth.module";
import { ScreenController } from "./screen.controller";
import { Screen } from "./screen.entity";
import { ScreenService } from "./screen.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([Screen]),
        AuthModule,
    ],
    controllers:[ScreenController],
    providers:[ScreenService]
})
export class ScreenModule{}