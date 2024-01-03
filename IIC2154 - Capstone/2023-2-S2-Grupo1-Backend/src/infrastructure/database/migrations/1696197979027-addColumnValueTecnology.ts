import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AddColumnValueTecnology1696197979027
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tecnologydb',
      new TableColumn({
        name: 'value',
        type: 'int', // Cambia el tipo de dato si es necesario
        isNullable: true // Puedes configurar la opción de nulidad según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tecnologydb', 'value');
  }
}
