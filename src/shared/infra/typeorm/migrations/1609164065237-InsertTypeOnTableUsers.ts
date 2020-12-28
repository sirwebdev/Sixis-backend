import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class InsertTypeOnTableUsers1609164065237 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'type',
                type: 'varchar',
                isNullable: false,
                default: 'user',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'type');
    }
}
