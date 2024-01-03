import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class UpdatedClient1695393048686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Eliminar columnas existentes
    await queryRunner.dropColumn('clientdb', 'number');
    await queryRunner.dropColumn('clientdb', 'email');
    await queryRunner.dropColumn('clientdb', 'company');

    // Agregar nueva columna rut_empresa
    await queryRunner.addColumn(
      'clientdb',
      new TableColumn({
        name: 'rut_empresa',
        type: 'varchar', // O el tipo de datos apropiado
        isNullable: true // Ajusta esto según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir los cambios en caso de un rollback
    await queryRunner.addColumn(
      'clientdb',
      new TableColumn({
        name: 'number',
        type: 'varchar'
      })
    );

    await queryRunner.addColumn(
      'clientdb',
      new TableColumn({
        name: 'email',
        type: 'varchar'
      })
    );

    await queryRunner.addColumn(
      'clientdb',
      new TableColumn({
        name: 'company',
        type: 'varchar'
      })
    );

    await queryRunner.dropColumn('clientdb', 'rut_empresa');
  }
}
