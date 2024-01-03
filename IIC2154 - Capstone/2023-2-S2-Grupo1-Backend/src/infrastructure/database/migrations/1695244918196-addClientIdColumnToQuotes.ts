import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddClientIdColumnToQuotes1695244918196
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'clientId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'quotedb',
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clientdb',
        onDelete: 'CASCADE' // Esto eliminará las deducciones si se elimina un tarifario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('quotedb', 'clientId');
    await queryRunner.dropColumn('quotedb', 'clientId');
  }
}
