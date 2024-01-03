import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AddColumnTypeUser1697922676132 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userdb',
      new TableColumn({
        name: 'type',
        type: 'varchar',
        default: "'KAM'"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userdb', 'type');
  }
}
