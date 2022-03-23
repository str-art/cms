import {MigrationInterface, QueryRunner} from "typeorm";

export class All1647957355901 implements MigrationInterface {
    name = 'All1647957355901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."file_orientation_enum" AS ENUM('portrait', 'landscape')`);
        await queryRunner.query(`CREATE TABLE "file" ("id" SERIAL NOT NULL, "key" character varying, "width" integer NOT NULL DEFAULT '1920', "height" integer NOT NULL DEFAULT '1080', "contentType" character varying NOT NULL, "contentId" integer NOT NULL, "orientation" "public"."file_orientation_enum" NOT NULL DEFAULT 'portrait', CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "screen" ADD "width" integer NOT NULL DEFAULT '1080'`);
        await queryRunner.query(`ALTER TABLE "screen" ADD "height" integer NOT NULL DEFAULT '1920'`);
        await queryRunner.query(`CREATE TYPE "public"."screen_orientation_enum" AS ENUM('portrait', 'landscape')`);
        await queryRunner.query(`ALTER TABLE "screen" ADD "orientation" "public"."screen_orientation_enum" NOT NULL DEFAULT 'portrait'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_abc4c6c6a915267ff3b4f8aaf9d" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_abc4c6c6a915267ff3b4f8aaf9d"`);
        await queryRunner.query(`ALTER TABLE "content" ALTER COLUMN "url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "screen" DROP COLUMN "orientation"`);
        await queryRunner.query(`DROP TYPE "public"."screen_orientation_enum"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "screen" DROP COLUMN "width"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TYPE "public"."file_orientation_enum"`);
    }

}
