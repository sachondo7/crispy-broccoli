import { TableColumn, type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddColumnQuantityTecnology1697149435726
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tecnologydb',
      new TableColumn({
        name: 'quantity',
        type: 'int',
        isNullable: true,
        default: 1
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tecnologydb', 'value');
  }
}
