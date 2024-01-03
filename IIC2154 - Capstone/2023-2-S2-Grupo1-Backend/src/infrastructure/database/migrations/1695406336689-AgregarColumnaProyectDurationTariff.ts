import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AgregarColumnaProyectDurationTariff1695406336689
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'proyectDuration',
        type: 'int', // Cambia el tipo de dato si es necesario
        isNullable: true, // Puedes configurar la opción de nulidad según tus necesidades
        default: 1 // Opcional: establece un valor predeterminado si es necesario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tariffdb', 'proyectDuration');
  }
}
