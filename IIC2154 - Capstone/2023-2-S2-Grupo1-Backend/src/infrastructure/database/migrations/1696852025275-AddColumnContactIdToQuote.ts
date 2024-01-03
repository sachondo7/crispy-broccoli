import {
  TableColumn,
  TableForeignKey,
  type MigrationInterface,
  type QueryRunner
} from 'typeorm';

export class AddColumnContactIdToQuote1696852025275
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'contactId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'quotedb',
      new TableForeignKey({
        columnNames: ['contactId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contactdb',
        onDelete: 'CASCADE' // Esto eliminará las deducciones si se elimina un tarifario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('quotedb', 'contactId');
    await queryRunner.dropColumn('quotedb', 'contactId');
  }
}
