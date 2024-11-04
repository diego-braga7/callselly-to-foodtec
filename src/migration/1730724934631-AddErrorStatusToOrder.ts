import { MigrationInterface, QueryRunner } from "typeorm";

export class AddErrorStatusToOrder1730724934631 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TYPE "public"."order_status_enum" ADD VALUE 'error'
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
            CREATE TYPE "public"."order_status_enum_old" AS ENUM ('pending', 'completed', 'cancelled');
            ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::text::"public"."order_status_enum_old";
            DROP TYPE "public"."order_status_enum";
            ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum";
            ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';
          `);
    }

}
