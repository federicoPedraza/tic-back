import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1739030436445 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the "users" table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`firstName\` VARCHAR(100) NOT NULL,
        \`lastName\` VARCHAR(100) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL UNIQUE,
        \`password\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
        \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Create the "course" table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`course\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`name\` VARCHAR(100) NOT NULL,
        \`description\` VARCHAR(255) NOT NULL DEFAULT '',
        \`isPublished\` TINYINT(1) NOT NULL DEFAULT 0,
        \`startsAt\` DATE NULL DEFAULT NULL,
        \`endsAt\` DATE NULL DEFAULT NULL,
        \`postedAt\` DATE NULL DEFAULT NULL,
        \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    // Create the "course_price" table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS \`course_price\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`price\` DECIMAL(10,2) NOT NULL,
        \`currency\` VARCHAR(3) NOT NULL,
        \`courseId\` INT NULL,
        PRIMARY KEY (\`id\`),
        CONSTRAINT \`FK_course_price_course\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order of dependencies:
    await queryRunner.query(`DROP TABLE IF EXISTS \`course_price\`;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`course\`;`);
    await queryRunner.query(`DROP TABLE IF EXISTS \`users\`;`);
  }
}
