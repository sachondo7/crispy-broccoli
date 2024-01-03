import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AgregarColumnaHourAssignmentProfiles1695396895695
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'profiledb',
      new TableColumn({
        name: 'hourAssignment',
        type: 'int', // Cambia el tipo de dato si es necesario
        isNullable: true, // Puedes configurar la opción de nulidad según tus necesidades
        default: 100 // Opcional: establece un valor predeterminado si es necesario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profiledb', 'hourAssignment');
  }
}
