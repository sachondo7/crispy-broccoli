import {
  type MigrationInterface,
  type QueryRunner,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class AgregarQouteAService1695096883513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'servicedb',
      new TableColumn({
        name: 'quoteId',
        type: 'int',
        isNullable: true // Puedes configurar esto según tus necesidades
      })
    );

    await queryRunner.createForeignKey(
      'servicedb',
      new TableForeignKey({
        columnNames: ['quoteId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'quotedb',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
