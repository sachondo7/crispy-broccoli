import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class UpdatedTariff1695397386841 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Agregar la columna 'risk' a la tabla 'tariffdb'
    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'risk',
        type: 'int',
        isNullable: true, // Ajusta según tus necesidades
        default: 0 // Opcional: ajusta según tus necesidades
      })
    );

    await queryRunner.addColumn(
      'tecnologydb',
      new TableColumn({
        name: 'tariffId',
        type: 'int',
        isNullable: true // Ajusta esto según tus necesidades
      })
    );

    // Crear la ForeignKey hacia 'tariffdb'
    await queryRunner.createForeignKey(
      'tecnologydb',
      new TableForeignKey({
        name: 'FK_Tecnologydb_Tariffdb',
        columnNames: ['tariffId'],
        referencedTableName: 'tariffdb',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL' // Ajusta esto según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar la columna 'risk' de la tabla 'tariffdb'
    await queryRunner.dropColumn('tariffdb', 'risk');

    // Eliminar la ForeignKey
    await queryRunner.dropForeignKey('tecnologydb', 'FK_Tecnologydb_Tariffdb');

    // Eliminar la columna 'tariffId'
    await queryRunner.dropColumn('tecnologydb', 'tariffId');
  }
}
