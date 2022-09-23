import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1663502265449 implements MigrationInterface {
    name = 'BaseMigration1663502265449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`content_link\` varchar(255) NOT NULL, \`file\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carousel\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`youtubes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`youtube_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles_roles\` (\`usersId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_df951a64f09865171d2d7a502b\` (\`usersId\`), INDEX \`IDX_b2f0366aa9349789527e0c36d9\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD CONSTRAINT \`FK_191675b22eb3ee27cda4aeb0f5f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carousel\` ADD CONSTRAINT \`FK_95df24888468162c7377b1a9a72\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`youtubes\` ADD CONSTRAINT \`FK_f30d24c889cfd47d6d0baba05c7\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_df951a64f09865171d2d7a502b1\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` ADD CONSTRAINT \`FK_b2f0366aa9349789527e0c36d97\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_b2f0366aa9349789527e0c36d97\``);
        await queryRunner.query(`ALTER TABLE \`users_roles_roles\` DROP FOREIGN KEY \`FK_df951a64f09865171d2d7a502b1\``);
        await queryRunner.query(`ALTER TABLE \`youtubes\` DROP FOREIGN KEY \`FK_f30d24c889cfd47d6d0baba05c7\``);
        await queryRunner.query(`ALTER TABLE \`carousel\` DROP FOREIGN KEY \`FK_95df24888468162c7377b1a9a72\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP FOREIGN KEY \`FK_191675b22eb3ee27cda4aeb0f5f\``);
        await queryRunner.query(`DROP INDEX \`IDX_b2f0366aa9349789527e0c36d9\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_df951a64f09865171d2d7a502b\` ON \`users_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles_roles\``);
        await queryRunner.query(`DROP TABLE \`youtubes\``);
        await queryRunner.query(`DROP TABLE \`carousel\``);
        await queryRunner.query(`DROP TABLE \`contents\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
