import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddDataErrorOrderTable1730829346474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "order",
            new TableColumn({
              name: "data_error",
              type: "text",
              isNullable: true,
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "data_error");
    }

}
