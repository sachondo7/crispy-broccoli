import {
  TableColumn,
  type MigrationInterface,
  type QueryRunner,
  TableForeignKey
} from 'typeorm';

export class corrigienfoFKTariffdbProfiledb1696202350883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Quita la restricción de clave externa existente si es necesario
    await queryRunner.dropForeignKey('profiledb', 'FK_Tariffdb_Profiledb');

    // Quita la columna 'tariffId' si es necesario
    await queryRunner.dropColumn('profiledb', 'tariffId');

    // Añade la nueva columna 'tariffId' a la tabla 'profiledb'
    await queryRunner.addColumn(
      'profiledb',
      new TableColumn({
        name: 'tariffId',
        type: 'int',
        isNullable: true // Ajusta según tus necesidades
      })
    );

    // Crear una nueva clave externa hacia 'tariffdb'
    await queryRunner.createForeignKey(
      'profiledb',
      new TableForeignKey({
        name: 'FK_Tariffdb_Profiledb',
        columnNames: ['tariffId'],
        referencedTableName: 'tariffdb', // Cambia 'profiledb' a 'tariffdb'
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE' // Opcional: ajusta según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Quita la restricción de clave externa
    await queryRunner.dropForeignKey('profiledb', 'FK_Tariffdb_Profiledb');

    // Quita la columna 'tariffId'
    await queryRunner.dropColumn('profiledb', 'tariffId');
  }
}
