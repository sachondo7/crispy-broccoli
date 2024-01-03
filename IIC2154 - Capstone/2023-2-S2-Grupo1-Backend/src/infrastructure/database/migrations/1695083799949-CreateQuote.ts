import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
  Table
} from 'typeorm';

export class CreateQuote1695083799949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quotedb',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'startDate',
            type: 'timestamptz'
          },
          {
            name: 'endDate',
            type: 'timestamptz'
          },
          {
            name: 'deliveryDate',
            type: 'timestamptz'
          },
          {
            name: 'margin',
            type: 'float'
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'risk',
            type: 'float'
          },
          {
            name: 'tariffId',
            type: 'int',
            isNullable: true
          }
        ]
      })
    );

    await queryRunner.createForeignKey(
      'quotedb',
      new TableForeignKey({
        columnNames: ['tariffId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tariffdb',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('quotedb', 'tariffId');
    await queryRunner.dropTable('quotedb');
  }
}
