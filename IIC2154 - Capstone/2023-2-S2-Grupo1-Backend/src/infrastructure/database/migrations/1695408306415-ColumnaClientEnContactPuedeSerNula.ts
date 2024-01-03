import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class ColumnaClientEnContactPuedeSerNula1695408306415
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contactdb',
      'clientId',
      new TableColumn({
        name: 'clientId',
        type: 'int', // Cambia el tipo de dato si es necesario
        isNullable: true // Permite valores nulos
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'contactdb',
      'clientId',
      new TableColumn({
        name: 'clientId',
        type: 'int', // Cambia el tipo de dato si es necesario
        isNullable: false // Requiere valores no nulos (puedes cambiarlo según tus necesidades)
      })
    );
  }
}
