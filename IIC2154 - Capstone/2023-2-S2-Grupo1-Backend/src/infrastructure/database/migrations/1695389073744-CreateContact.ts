import { Table, type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateContact1695389073744 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contactdb',
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
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'clientId',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['clientId'],
            referencedTableName: 'clientdb',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE' // Puedes ajustar esto según tus necesidades
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contactdb');
  }
}
