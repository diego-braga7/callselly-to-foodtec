import { MigrationInterface, QueryRunner, Table  } from "typeorm";

export class CreateOrderTable1730692223222 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: "order",
                columns: [
                    {
                      name: "id",
                      type: "uuid",
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: "uuid",
                      default: "uuid_generate_v4()",
                    },
                    {
                        name: "data",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["pending", "completed", "cancelled"],
                        isNullable: false,
                      },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true
                    }
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("order");
        
        await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
    }

}
