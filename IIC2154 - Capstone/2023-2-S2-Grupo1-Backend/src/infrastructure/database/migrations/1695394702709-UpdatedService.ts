import {
  type MigrationInterface,
  type QueryRunner,
  TableForeignKey
} from 'typeorm';

export class UpdatedService1695394702709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Cambiar el nombre de la columna de 'quoteId' a 'tariffId'
    await queryRunner.renameColumn('servicedb', 'quoteId', 'tariffId');

    // Crear una nueva clave externa hacia Tariffdb
    await queryRunner.createForeignKey(
      'servicedb',
      new TableForeignKey({
        name: 'FK_Servicedb_Tariffdb',
        columnNames: ['tariffId'],
        referencedTableName: 'tariffdb',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE' // Opcional: ajusta según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Cambiar el nombre de la columna de 'tariffId' a 'quoteId'
    await queryRunner.renameColumn('servicedb', 'tariffId', 'quoteId');

    // Eliminar la nueva clave externa hacia Tariffdb
    await queryRunner.dropForeignKey('servicedb', 'FK_Servicedb_Tariffdb');

    // Crear nuevamente la clave externa hacia Quote (si es necesario)
    await queryRunner.createForeignKey(
      'servicedb',
      new TableForeignKey({
        name: 'FK_1349f47ab1ce873e6a974962b65', // Reemplaza XXXXXXXXXXXX con el nombre de la clave externa original
        columnNames: ['quoteId'], // Reemplaza con el nombre de la columna original
        referencedTableName: 'quotedb', // Reemplaza con el nombre de la tabla original
        referencedColumnNames: ['id'], // Reemplaza con el nombre de la columna original de referencia
        onDelete: 'CASCADE' // Opcional: ajusta según tus necesidades
      })
    );
  }
}
