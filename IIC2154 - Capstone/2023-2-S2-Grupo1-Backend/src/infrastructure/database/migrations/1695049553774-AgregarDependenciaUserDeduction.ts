import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarDependenciaUserDeduction1695049553774
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('deductiondb', 'userId');

    await queryRunner.addColumn(
      'deductiondb',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'deductiondb',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'userdb',
        onDelete: 'CASCADE' // Esto eliminará las deducciones si se elimina un usuario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revierte los cambios realizados en el método up
    await queryRunner.dropForeignKey('deductiondb', 'userId');
    await queryRunner.dropColumn('deductiondb', 'userId');
  }
}
