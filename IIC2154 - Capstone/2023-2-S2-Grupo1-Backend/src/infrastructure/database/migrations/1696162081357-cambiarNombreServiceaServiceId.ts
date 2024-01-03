import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CambiarNombreServiceaServiceId1696162081357
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cambio de nombre
    await queryRunner.renameColumn('tariffdb', 'service', 'serviceId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('tariffdb', 'serviceId', 'service');
  }
}
