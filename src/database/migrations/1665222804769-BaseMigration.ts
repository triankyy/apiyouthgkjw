import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1665222804769 implements MigrationInterface {
    name = 'BaseMigration1665222804769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wilayah" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3d126b0ed758443d4483c4ebca3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "password" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "wilayahId" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carousel" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "label" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_d59e0674c5a5efe523df247f67b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "youtubes" ("id" SERIAL NOT NULL, "youtube_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_ca0c369d01879ded3258eec8c0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ibadah" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b618996515f9c79cf400b4e6629" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jadwal_pelayan" ("id" SERIAL NOT NULL, "tanggal" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ibadahId" integer, "pelayanId" integer, CONSTRAINT "PK_2897460d385637319a34aa4e319" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "user_wl" ("jadwalPelayanId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_15c2e2aae34dc4be1371bab9ccc" PRIMARY KEY ("jadwalPelayanId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_622dcfe5cf9dc7b51c8f89ad9c" ON "user_wl" ("jadwalPelayanId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4db136a2d62cfd06c5fc9c07bd" ON "user_wl" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "user_musik" ("jadwalPelayanId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_30ccdd9f06208f4f03c4bf50bd9" PRIMARY KEY ("jadwalPelayanId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_555ea7f4c8c23aa8814576e714" ON "user_musik" ("jadwalPelayanId") `);
        await queryRunner.query(`CREATE INDEX "IDX_85e59e18d2c05d7a8502cc85e1" ON "user_musik" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "user_singer" ("jadwalPelayanId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_b8214631740285889aea514c72f" PRIMARY KEY ("jadwalPelayanId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9ced46d89ffd18182e5087163e" ON "user_singer" ("jadwalPelayanId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5fe619f0faa1a3c9bfe8469f4e" ON "user_singer" ("usersId") `);
        await queryRunner.query(`CREATE TABLE "user_operator" ("jadwalPelayanId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_68ddd7e8de342e5e999cdc3675e" PRIMARY KEY ("jadwalPelayanId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2e5a682d87a2039fa8b552388" ON "user_operator" ("jadwalPelayanId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b24756c10d92a19a6fb1031797" ON "user_operator" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1ec454351e4844f0c572827b6fc" FOREIGN KEY ("wilayahId") REFERENCES "wilayah"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carousel" ADD CONSTRAINT "FK_95df24888468162c7377b1a9a72" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "youtubes" ADD CONSTRAINT "FK_f30d24c889cfd47d6d0baba05c7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jadwal_pelayan" ADD CONSTRAINT "FK_286e11a5aef0eaf542271c777e6" FOREIGN KEY ("ibadahId") REFERENCES "ibadah"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jadwal_pelayan" ADD CONSTRAINT "FK_8cadd9654ca6404d7729ae04243" FOREIGN KEY ("pelayanId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_wl" ADD CONSTRAINT "FK_622dcfe5cf9dc7b51c8f89ad9c0" FOREIGN KEY ("jadwalPelayanId") REFERENCES "jadwal_pelayan"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_wl" ADD CONSTRAINT "FK_4db136a2d62cfd06c5fc9c07bd5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_musik" ADD CONSTRAINT "FK_555ea7f4c8c23aa8814576e7143" FOREIGN KEY ("jadwalPelayanId") REFERENCES "jadwal_pelayan"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_musik" ADD CONSTRAINT "FK_85e59e18d2c05d7a8502cc85e1c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_singer" ADD CONSTRAINT "FK_9ced46d89ffd18182e5087163e5" FOREIGN KEY ("jadwalPelayanId") REFERENCES "jadwal_pelayan"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_singer" ADD CONSTRAINT "FK_5fe619f0faa1a3c9bfe8469f4e3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_operator" ADD CONSTRAINT "FK_f2e5a682d87a2039fa8b5523886" FOREIGN KEY ("jadwalPelayanId") REFERENCES "jadwal_pelayan"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_operator" ADD CONSTRAINT "FK_b24756c10d92a19a6fb1031797c" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_operator" DROP CONSTRAINT "FK_b24756c10d92a19a6fb1031797c"`);
        await queryRunner.query(`ALTER TABLE "user_operator" DROP CONSTRAINT "FK_f2e5a682d87a2039fa8b5523886"`);
        await queryRunner.query(`ALTER TABLE "user_singer" DROP CONSTRAINT "FK_5fe619f0faa1a3c9bfe8469f4e3"`);
        await queryRunner.query(`ALTER TABLE "user_singer" DROP CONSTRAINT "FK_9ced46d89ffd18182e5087163e5"`);
        await queryRunner.query(`ALTER TABLE "user_musik" DROP CONSTRAINT "FK_85e59e18d2c05d7a8502cc85e1c"`);
        await queryRunner.query(`ALTER TABLE "user_musik" DROP CONSTRAINT "FK_555ea7f4c8c23aa8814576e7143"`);
        await queryRunner.query(`ALTER TABLE "user_wl" DROP CONSTRAINT "FK_4db136a2d62cfd06c5fc9c07bd5"`);
        await queryRunner.query(`ALTER TABLE "user_wl" DROP CONSTRAINT "FK_622dcfe5cf9dc7b51c8f89ad9c0"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "jadwal_pelayan" DROP CONSTRAINT "FK_8cadd9654ca6404d7729ae04243"`);
        await queryRunner.query(`ALTER TABLE "jadwal_pelayan" DROP CONSTRAINT "FK_286e11a5aef0eaf542271c777e6"`);
        await queryRunner.query(`ALTER TABLE "youtubes" DROP CONSTRAINT "FK_f30d24c889cfd47d6d0baba05c7"`);
        await queryRunner.query(`ALTER TABLE "carousel" DROP CONSTRAINT "FK_95df24888468162c7377b1a9a72"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1ec454351e4844f0c572827b6fc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b24756c10d92a19a6fb1031797"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2e5a682d87a2039fa8b552388"`);
        await queryRunner.query(`DROP TABLE "user_operator"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5fe619f0faa1a3c9bfe8469f4e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ced46d89ffd18182e5087163e"`);
        await queryRunner.query(`DROP TABLE "user_singer"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85e59e18d2c05d7a8502cc85e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_555ea7f4c8c23aa8814576e714"`);
        await queryRunner.query(`DROP TABLE "user_musik"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4db136a2d62cfd06c5fc9c07bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_622dcfe5cf9dc7b51c8f89ad9c"`);
        await queryRunner.query(`DROP TABLE "user_wl"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "jadwal_pelayan"`);
        await queryRunner.query(`DROP TABLE "ibadah"`);
        await queryRunner.query(`DROP TABLE "youtubes"`);
        await queryRunner.query(`DROP TABLE "carousel"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "wilayah"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
