import {
  type MigrationInterface,
  type QueryRunner,
  TableForeignKey,
  TableColumn,
  Table
} from 'typeorm';

export class UpdatedProfile1695393706835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar columnas name y lastname
    await queryRunner.dropColumn('profiledb', 'name');
    await queryRunner.dropColumn('profiledb', 'lastname');

    // Crear la nueva tabla profile_tariff
    await queryRunner.createTable(
      new Table({
        name: 'profile_tariff',
        columns: [
          {
            name: 'profileId',
            type: 'int'
          },
          {
            name: 'tariffId',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['profileId'],
            referencedTableName: 'profiledb',
            referencedColumnNames: ['id']
          },
          {
            columnNames: ['tariffId'],
            referencedTableName: 'tariffdb', // Cambia a la tabla de tariff
            referencedColumnNames: ['id'] // Cambia a la columna id de tariff
          }
        ]
      })
    );

    // Eliminar la antigua tabla profile_quote
    await queryRunner.dropTable('profile_quote');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en caso de un rollback

    // Agregar columnas name y lastname nuevamente
    await queryRunner.addColumn(
      'profiledb',
      new TableColumn({
        name: 'name',
        type: 'varchar'
      })
    );
    await queryRunner.addColumn(
      'profiledb',
      new TableColumn({
        name: 'lastname',
        type: 'varchar'
      })
    );

    // Eliminar la clave externa hacia Tariffdb
    await queryRunner.createTable(
      new Table({
        name: 'profile_quote',
        columns: [
          {
            name: 'profileId',
            type: 'int'
          },
          {
            name: 'quoteId',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['profileId'],
            referencedTableName: 'profiledb',
            referencedColumnNames: ['id']
          },
          {
            columnNames: ['quoteId'],
            referencedTableName: 'quotedb',
            referencedColumnNames: ['id']
          }
        ]
      })
    );

    // Eliminar la nueva tabla profile_tariff
    await queryRunner.dropTable('profile_tariff');
  }
}
