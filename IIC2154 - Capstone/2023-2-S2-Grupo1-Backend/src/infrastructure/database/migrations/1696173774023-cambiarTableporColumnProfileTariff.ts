import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CambiarTableporColumnProfileTariff1696173774023
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profile_tariff');

    await queryRunner.addColumn(
      'profiledb',
      new TableColumn({
        name: 'tariffId',
        type: 'int',
        isNullable: true // Ajusta según tus necesidades
      })
    );

    // Crear una nueva clave externa hacia Servicedb en Tariffdb
    await queryRunner.createForeignKey(
      'profiledb',
      new TableForeignKey({
        name: 'FK_Tariffdb_Profiledb',
        columnNames: ['tariffId'],
        referencedTableName: 'profiledb',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE' // Opcional: ajusta según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profiledb', 'tariffId');
    await queryRunner.dropForeignKey('profiledb', 'FK_Tariffdb_Profiledb');
  }
}
