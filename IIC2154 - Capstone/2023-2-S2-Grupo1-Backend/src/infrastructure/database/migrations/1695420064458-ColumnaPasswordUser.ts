import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class ColumnaPasswordUser1695420064458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userdb',
      new TableColumn({
        name: 'passwordHash',
        type: 'varchar', // Cambia el tipo de dato si es necesario
        isNullable: true // Puedes configurar la opción de nulidad según tus necesidades
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userdb', 'passwordHash');
  }
}
