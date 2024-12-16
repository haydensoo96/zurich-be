import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration20231010120000 implements MigrationInterface {
  name = 'InitialMigration20231010120000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL NOT NULL,
        "productCode" character varying NOT NULL,
        "description" character varying NOT NULL,
        "location" character varying NOT NULL,
        "price" numeric NOT NULL,
        CONSTRAINT "PK_product" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_product_productCode" UNIQUE ("productCode")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "product";
    `);
  }
}
