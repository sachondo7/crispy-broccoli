import {
  type MigrationInterface,
  type QueryRunner,
  TableForeignKey,
  TableColumn
} from 'typeorm';

export class CambiarRelacionTariffService1696160213870
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {

    // Cambio de nombre
    await queryRunner.dropColumn('servicedb', 'tariffId');

    // Añadir una nueva columna 'serviceId' a la tabla 'tariffdb'
    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'service',
        type: 'int',
        isNullable: true // Ajusta según tus necesidades
      })
    );

    // Crear una nueva clave externa hacia Servicedb en Tariffdb
    await queryRunner.createForeignKey(
      'tariffdb',
      new TableForeignKey({
        name: 'FK_Tariffdb_Servicedb',
        columnNames: ['service'],
        referencedTableName: 'servicedb',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE' // Opcional: ajusta según tus necesidades
      })
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar la clave externa hacia Servicedb en Tariffdb
    await queryRunner.dropForeignKey('tariffdb', 'FK_Tariffdb_Servicedb');

    // Eliminar la columna 'serviceId' de la tabla 'tariffdb'
    await queryRunner.dropColumn('tariffdb', 'service');
  }
}
