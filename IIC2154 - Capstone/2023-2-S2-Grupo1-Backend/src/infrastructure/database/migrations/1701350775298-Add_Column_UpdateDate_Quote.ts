import {
  TableColumn,
  type MigrationInterface,
  type QueryRunner
} from 'typeorm';

export class AddColumnUpdateDateQuote1701350775298
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'updateDate',
        type: 'timestamptz',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('quotedb', 'updateDate');
  }
}
