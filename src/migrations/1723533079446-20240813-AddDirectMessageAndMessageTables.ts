import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDirectMessageAndMessageTables1689245678902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create DirectMessage table
        await queryRunner.createTable(new Table({
            name: 'direct_message',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'roomId',
                    type: 'varchar',
                },
                {
                    name: 'user1Id',
                    type: 'int',
                },
                {
                    name: 'user2Id',
                    type: 'int',
                },
            ],
        }), true);

        // Create Message table
        await queryRunner.createTable(new Table({
            name: 'message',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'content',
                    type: 'text',
                },
                {
                    name: 'senderId',
                    type: 'int',
                },
                {
                    name: 'directMessageId',
                    type: 'int',
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        }), true);

        // Add foreign key constraints
        await queryRunner.createForeignKey('direct_message', new TableForeignKey({
            columnNames: ['user1Id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));

        await queryRunner.createForeignKey('direct_message', new TableForeignKey({
            columnNames: ['user2Id'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));

        await queryRunner.createForeignKey('message', new TableForeignKey({
            columnNames: ['senderId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
        }));

        await queryRunner.createForeignKey('message', new TableForeignKey({
            columnNames: ['directMessageId'],
            referencedTableName: 'direct_message',
            referencedColumnNames: ['id'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign key constraints
        await queryRunner.dropForeignKey('message', 'FK_message_senderId');
        await queryRunner.dropForeignKey('message', 'FK_message_directMessageId');
        await queryRunner.dropForeignKey('direct_message', 'FK_direct_message_user1Id');
        await queryRunner.dropForeignKey('direct_message', 'FK_direct_message_user2Id');

        // Drop tables
        await queryRunner.dropTable('message');
        await queryRunner.dropTable('direct_message');
    }
}
