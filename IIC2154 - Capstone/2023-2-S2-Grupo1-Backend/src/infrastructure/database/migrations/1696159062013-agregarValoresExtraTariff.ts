import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarValoresExtraTariff1696159062013
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'otherCosts',
        type: 'int',
        isNullable: true,
        default: 0
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en el método up
    await queryRunner.dropColumn('tariffdb', 'otherCosts');
  }
}
