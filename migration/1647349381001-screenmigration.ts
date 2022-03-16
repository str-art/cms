import {MigrationInterface, QueryRunner} from "typeorm";

export class screenmigration1647349381001 implements MigrationInterface {
    name = 'screenmigration1647349381001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screen" ADD "width" integer NOT NULL DEFAULT '1080'`);
        await queryRunner.query(`ALTER TABLE "screen" ADD "height" integer NOT NULL DEFAULT '1920'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screen" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP COLUMN "width"`);
    }

}
