import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateTariff1694988243660 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tariffdb',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'currency',
            type: 'varchar'
          },
          {
            name: 'priceWhitDeduction',
            type: 'int'
          },
          {
            name: 'grossPrice',
            type: 'int'
          },
          {
            name: 'deductionId',
            type: 'int'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tariffdb');
  }
}
