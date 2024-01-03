import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarDependenciaDeductionUser1695050173502
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userdb',
      new TableColumn({
        name: 'deductions',
        type: 'int[]', // Esto es un array de IDs de deducciones
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en el método up
    await queryRunner.dropColumn('userdb', 'deductions');
  }
}
