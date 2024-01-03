import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class UpdatedQuote1695396017871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar las columnas "margin" y "risk"
    await queryRunner.dropColumn('quotedb', 'margin');
    await queryRunner.dropColumn('quotedb', 'risk');

    // Agregar una nueva columna "idProyecto"
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'idProyecto',
        type: 'varchar', // Ajusta el tipo de dato según tus necesidades
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en caso de un rollback

    // Agregar las columnas "margin" y "risk"
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'margin',
        type: 'float' // Ajusta el tipo de dato según corresponda
      })
    );

    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'risk',
        type: 'float' // Ajusta el tipo de dato según corresponda
      })
    );

    // Eliminar la columna "idProyecto"
    await queryRunner.dropColumn('quotedb', 'idProyecto');
  }
}
