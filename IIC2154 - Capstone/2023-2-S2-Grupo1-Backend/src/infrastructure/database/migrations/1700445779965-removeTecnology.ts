import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class RemoveTecnology1700445779965 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Remove foreign key in the tariff table
    await queryRunner.dropForeignKey('tecnologydb', 'FK_Tecnologydb_Tariffdb');

    // Remove the "technology" table
    await queryRunner.dropTable('tecnologydb');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
