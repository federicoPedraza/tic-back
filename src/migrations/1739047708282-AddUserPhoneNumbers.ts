import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhoneNumbers1739047708282 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE \`users\`
          ADD COLUMN \`phone\` VARCHAR(255) DEFAULT NULL;
        `);
    }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          ALTER TABLE \`users\`
          DROP COLUMN \`phone\`;
        `);
    }
}
