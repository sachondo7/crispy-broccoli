import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class CorregirNombreDependenciaDeductions1695054283746
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Elimina la columna userId si ya existe
    await queryRunner.dropColumn('deductiondb', 'userId');

    // Agrega la nueva columna userId
    await queryRunner.addColumn(
      'deductiondb',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    // Crea la nueva clave foránea
    await queryRunner.createForeignKey(
      'deductiondb',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'], // Columna 'id' en la tabla de usuarios (ajusta esto según tu estructura)
        referencedTableName: 'userdb', // Nombre de la tabla de usuarios (ajusta esto según tu estructura)
        onDelete: 'CASCADE' // Esto eliminará las deducciones si se elimina un usuario (ajusta según tus necesidades)
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revierte los cambios realizados en el método up
    await queryRunner.dropForeignKey('deductiondb', 'userId');
    await queryRunner.dropColumn('deductiondb', 'userId');
  }
}
