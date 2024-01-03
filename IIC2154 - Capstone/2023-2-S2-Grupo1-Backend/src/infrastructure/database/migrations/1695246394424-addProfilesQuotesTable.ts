import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey,
  Table
} from 'typeorm';

export class AddProfilesQuotesTable1695246394424 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'profile_quote',
        columns: [
          {
            name: 'profileId',
            type: 'int'
          },
          {
            name: 'quoteId',
            type: 'int'
          }
        ],
        foreignKeys: [
          {
            columnNames: ['profileId'],
            referencedTableName: 'profiledb',
            referencedColumnNames: ['id']
          },
          {
            columnNames: ['quoteId'],
            referencedTableName: 'quotedb',
            referencedColumnNames: ['id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('profile_quote');
  }
}
