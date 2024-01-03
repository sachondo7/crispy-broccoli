import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfile1694805396579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profiledb',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'lastname',
            type: 'varchar'
          },
          {
            name: 'role',
            type: 'varchar'
          },
          {
            name: 'costperhour',
            type: 'int'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profiledb');
  }
}
