import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';

export class AddBlockedColumnToUser1697571900482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'userdb',
      new TableColumn({
        name: 'blocked',
        type: 'bool',
        default: false
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('userdb', 'blocked');
  }
}
