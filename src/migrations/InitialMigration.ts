import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration implements MigrationInterface {
  name = 'InitialMigration';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "productCode" character varying NOT NULL,
        "description" character varying NOT NULL,
        "location" character varying NOT NULL,
        "price" numeric NOT NULL,
        CONSTRAINT "PK_product" PRIMARY KEY ("productCode")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "product";
    `);
  }
}
