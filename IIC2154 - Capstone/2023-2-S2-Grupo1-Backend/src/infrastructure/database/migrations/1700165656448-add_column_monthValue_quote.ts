import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn
} from 'typeorm';
export class AddColumnMonthValueQuote1700165656448
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tariffdb',
      new TableColumn({
        name: 'monthPrice',
        type: 'int',
        default: 0
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tariffdb', 'monthPrice');
  }
}
