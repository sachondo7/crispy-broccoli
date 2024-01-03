import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AddTokenDeviseToUsers1700055739014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userdb',
      new TableColumn({
        name: 'tokenDevise',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userdb', 'tokenDevise');
  }
}
