import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarDependenciaTariffDeduction1695072983979
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tariffdb', 'deductionId');

    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'deductions',
        type: 'int[]', // Esto es un array de IDs de deducciones
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en el método up
    await queryRunner.dropColumn('tariffdb', 'deductions');
  }
}
