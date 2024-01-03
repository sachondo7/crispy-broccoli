import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AddUserIdColumnToQuotes1695236828363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quotedb',
      new TableColumn({
        name: 'userId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'quotedb',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'userdb',
        onDelete: 'CASCADE', // Esto eliminará las deducciones si se elimina un tarifario
        onUpdate: 'CASCADE' // Esto actualizará las deducciones si se actualiza un tarifario
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('quotedb', 'userId');
    await queryRunner.dropColumn('quotedb', 'userId');
  }
}
