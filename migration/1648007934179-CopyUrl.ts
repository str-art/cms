import {MigrationInterface, QueryRunner} from "typeorm";

export class CopyUrl1648007934179 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO file ("contentId", key) SELECT id, url FROM content WHERE url IS NOT NULL`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
