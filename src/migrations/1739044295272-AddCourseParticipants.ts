import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCourseParticipantsMigration1739044295272 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`course_participants\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`email\` VARCHAR(255) NOT NULL,
        \`phone\` VARCHAR(255) DEFAULT NULL,
        \`isConfirmed\` BOOLEAN NOT NULL DEFAULT false,
        \`isPaid\` BOOLEAN NOT NULL DEFAULT false,
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        \`courseId\` INT NULL,
        CONSTRAINT \`FK_course_participants_course\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`course_participants\`;`);
  }
}
