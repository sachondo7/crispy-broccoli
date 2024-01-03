import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateDeduction1694984980359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deductiondb',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'authorization',
            type: 'boolean'
          },
          {
            name: 'percentage',
            type: 'int'
          },
          {
            name: 'userId',
            type: 'int'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deductiondb');
  }
}
