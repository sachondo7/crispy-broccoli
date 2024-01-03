import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarDependenciaDeductionTariff1695072993982
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'deductiondb',
      new TableColumn({
        name: 'tariffId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'deductiondb',
      new TableForeignKey({
        columnNames: ['tariffId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tariffdb',
        onDelete: 'CASCADE' // Esto eliminará las deducciones si se elimina un tarifario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revierte los cambios realizados en el método up
    await queryRunner.dropForeignKey('deductiondb', 'tariffId');
    await queryRunner.dropColumn('deductiondb', 'tariffId');
  }
}
